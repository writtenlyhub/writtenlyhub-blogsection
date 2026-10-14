/**
 * Server-side Google reCAPTCHA Enterprise & v2 verification engine.
 *
 * Supports:
 * 1. Google Cloud reCAPTCHA Enterprise Assessment API (REST):
 *    - Service Account authentication (OAuth 2.0 Bearer Token) with least-privilege role:
 *      roles/recaptchaenterprise.agent (recaptchaenterprise.assessments.create)
 *    - Google Cloud API Key (restricted to reCAPTCHA Enterprise API)
 *    Endpoint: https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments
 *
 * 2. Legacy / Standard siteverify fallback (when configured with secret key):
 *    Endpoint: https://www.google.com/recaptcha/api/siteverify
 *
 * NOTE: Server-side secret keys, API keys, and service account credentials must
 * NEVER be exposed via NEXT_PUBLIC_ variables or imported into client components.
 */

import { getGoogleCloudAccessToken } from './gcp-auth';

export interface RecaptchaVerifyOptions {
  remoteIp?: string;
  expectedAction?: string; // Default: 'CONTACT_FORM'
  siteKey?: string;
}

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challengeTs?: string;
  errorCodes?: string[];
  invalidReason?: string;
  assessmentName?: string;
  verificationMethod: 'enterprise_assessment' | 'siteverify' | 'pre_validation';
  message: string;
}

const ERROR_CODE_MESSAGES: Record<string, string> = {
  'missing-input-secret': 'The Secret Key is missing from the server request.',
  'invalid-input-secret': 'The Secret Key provided to Google is invalid.',
  'missing-input-response': 'Please complete the "I\'m not a robot" verification before submitting.',
  'invalid-input-response': 'The verification token is invalid or corrupted.',
  'bad-request': 'The verification request was malformed.',
  'timeout-or-duplicate': 'The verification token has expired or was already used. Please verify again.',
};

const INVALID_REASON_MESSAGES: Record<string, string> = {
  EXPIRED: 'The verification token has expired. Please verify again.',
  DUPE: 'The verification token has already been used. Please verify again.',
  MISSING: 'The verification token was missing.',
  ACTION_MISMATCH: 'Security verification failed: action mismatch.',
  SITEKEY_MISMATCH: 'Security verification failed: site key mismatch.',
  INVALID_REASON_UNSPECIFIED: 'Security verification failed: invalid token.',
};

export async function verifyRecaptchaToken(
  token: string | null | undefined,
  options?: RecaptchaVerifyOptions
): Promise<RecaptchaVerifyResult> {
  const expectedAction = options?.expectedAction || 'CONTACT_FORM';
  const siteKey = options?.siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // 1. Pre-validation: Token presence
  const trimmedToken = token?.trim();
  if (!trimmedToken) {
    return {
      success: false,
      verificationMethod: 'pre_validation',
      errorCodes: ['missing-input-response'],
      message: 'Please complete the "I\'m not a robot" verification before submitting.',
    };
  }

  // Determine verification credentials
  const enterpriseProjectId = process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT_ID;
  const enterpriseApiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Try obtaining an OAuth access token from Service Account / ADC
  const gcpAccessToken = await getGoogleCloudAccessToken();

  const isDev = process.env.NODE_ENV !== 'production';
  const allowedHostnames = isDev
    ? ['localhost', '127.0.0.1']
    : ['writtenlyhub.com', 'www.writtenlyhub.com'];

  // =========================================================================
  // METHOD 1: Google Cloud reCAPTCHA Enterprise Assessment API
  // Supported via:
  // - Service Account Bearer Token (Authorization: Bearer <token>)
  // - API Key (query parameter ?key=<api_key>)
  // =========================================================================
  if (enterpriseProjectId && (gcpAccessToken || enterpriseApiKey)) {
    try {
      const assessmentUrl = gcpAccessToken
        ? `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(enterpriseProjectId)}/assessments`
        : `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(enterpriseProjectId)}/assessments?key=${encodeURIComponent(enterpriseApiKey!)}`;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (gcpAccessToken) {
        headers['Authorization'] = `Bearer ${gcpAccessToken}`;
      }

      const requestPayload = {
        event: {
          token: trimmedToken,
          siteKey: siteKey,
          expectedAction: expectedAction,
        },
      };

      const response = await fetch(assessmentUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestPayload),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`[reCAPTCHA Enterprise] Assessment API responded with HTTP ${response.status}`);
        const errJson = await response.json().catch(() => ({}));
        return {
          success: false,
          verificationMethod: 'enterprise_assessment',
          errorCodes: [`http-status-${response.status}`, errJson?.error?.message || 'assessment-failed'],
          message: 'Could not complete security assessment with Google. Please try again.',
        };
      }

      const assessmentData = await response.json();
      const tokenProps = assessmentData.tokenProperties;
      const riskAnalysis = assessmentData.riskAnalysis;

      // 1. Check token validity
      if (!tokenProps || !tokenProps.valid) {
        const reason = tokenProps?.invalidReason || 'INVALID_REASON_UNSPECIFIED';
        return {
          success: false,
          verificationMethod: 'enterprise_assessment',
          invalidReason: reason,
          errorCodes: [reason.toLowerCase()],
          message: INVALID_REASON_MESSAGES[reason] || 'reCAPTCHA verification failed. Please try again.',
        };
      }

      // 2. Validate expected action
      if (tokenProps.action && tokenProps.action !== expectedAction) {
        console.warn(`[reCAPTCHA Enterprise] Action mismatch: expected ${expectedAction}, got ${tokenProps.action}`);
        return {
          success: false,
          verificationMethod: 'enterprise_assessment',
          action: tokenProps.action,
          invalidReason: 'ACTION_MISMATCH',
          errorCodes: ['action-mismatch'],
          message: 'reCAPTCHA security check failed: action mismatch.',
        };
      }

      // 3. Validate origin hostname
      if (tokenProps.hostname && !allowedHostnames.includes(tokenProps.hostname)) {
        if (!isDev) {
          console.warn(`[reCAPTCHA Enterprise] Hostname mismatch in production: ${tokenProps.hostname}`);
          return {
            success: false,
            verificationMethod: 'enterprise_assessment',
            hostname: tokenProps.hostname,
            invalidReason: 'HOSTNAME_MISMATCH',
            errorCodes: ['hostname-mismatch'],
            message: 'reCAPTCHA verification failed: origin hostname is not authorized.',
          };
        }
      }

      // 4. Validate risk score (if provided)
      if (typeof riskAnalysis?.score === 'number' && riskAnalysis.score < 0.5) {
        console.warn(`[reCAPTCHA Enterprise] Risk score below threshold: ${riskAnalysis.score}`);
        return {
          success: false,
          verificationMethod: 'enterprise_assessment',
          score: riskAnalysis.score,
          errorCodes: ['low-risk-score'],
          message: 'Security check flagged submission as suspicious. Please try again.',
        };
      }

      return {
        success: true,
        verificationMethod: 'enterprise_assessment',
        score: riskAnalysis?.score,
        action: tokenProps.action,
        hostname: tokenProps.hostname,
        challengeTs: tokenProps.createTime,
        assessmentName: assessmentData.name,
        message: 'reCAPTCHA Enterprise verified successfully.',
      };
    } catch (err) {
      console.error('[reCAPTCHA Enterprise] Exception calling assessment API:', err);
      if (!secretKey) {
        return {
          success: false,
          verificationMethod: 'enterprise_assessment',
          errorCodes: ['assessment-network-exception'],
          message: 'Network error communicating with Google reCAPTCHA Enterprise service.',
        };
      }
    }
  }

  // =========================================================================
  // METHOD 2: Standard Google siteverify Endpoint
  // =========================================================================
  if (secretKey) {
    try {
      const params = new URLSearchParams();
      params.append('secret', secretKey);
      params.append('response', trimmedToken);
      if (options?.remoteIp && options.remoteIp !== 'unknown') {
        params.append('remoteip', options.remoteIp);
      }

      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`[reCAPTCHA] Google siteverify failed with status: ${response.status}`);
        return {
          success: false,
          verificationMethod: 'siteverify',
          errorCodes: [`http-status-${response.status}`],
          message: 'Could not reach Google verification servers. Please try again.',
        };
      }

      const data: {
        success: boolean;
        challenge_ts?: string;
        hostname?: string;
        'error-codes'?: string[];
      } = await response.json();

      const errorCodes = data['error-codes'] || [];

      if (!data.success) {
        const firstError = errorCodes[0];
        const friendlyMessage = firstError && ERROR_CODE_MESSAGES[firstError]
          ? ERROR_CODE_MESSAGES[firstError]
          : 'reCAPTCHA verification failed. Please try again.';

        return {
          success: false,
          verificationMethod: 'siteverify',
          hostname: data.hostname,
          challengeTs: data.challenge_ts,
          errorCodes,
          message: friendlyMessage,
        };
      }

      // Hostname validation
      if (data.hostname && !allowedHostnames.includes(data.hostname)) {
        if (!isDev) {
          console.warn(`[reCAPTCHA] Hostname mismatch in production: ${data.hostname}`);
          return {
            success: false,
            verificationMethod: 'siteverify',
            hostname: data.hostname,
            challengeTs: data.challenge_ts,
            errorCodes: ['hostname-mismatch'],
            message: 'reCAPTCHA verification failed: origin hostname is not authorized.',
          };
        }
      }

      return {
        success: true,
        verificationMethod: 'siteverify',
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
        message: 'reCAPTCHA verified successfully.',
      };
    } catch (error) {
      console.error('[reCAPTCHA] siteverify exception:', error);
      return {
        success: false,
        verificationMethod: 'siteverify',
        errorCodes: ['siteverify-exception'],
        message: 'An unexpected error occurred during security verification.',
      };
    }
  }

  return {
    success: false,
    verificationMethod: 'pre_validation',
    errorCodes: ['unconfigured-verification'],
    message: 'reCAPTCHA verification failed due to missing server configuration.',
  };
}
