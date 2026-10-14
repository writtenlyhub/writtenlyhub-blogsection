import crypto from 'crypto';
import fs from 'fs';

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  token_uri?: string;
  project_id?: string;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

/**
 * Generates an OAuth 2.0 access token for Google Cloud authentication
 * using a Service Account with least-privilege role (e.g. roles/recaptchaenterprise.agent).
 *
 * Checks:
 * 1. RECAPTCHA_ENTERPRISE_CREDENTIALS (raw JSON or base64 JSON in env)
 * 2. GOOGLE_APPLICATION_CREDENTIALS (file path to service account key)
 */
export async function getGoogleCloudAccessToken(): Promise<string | null> {
  // Check cached token (with 5-minute safety buffer)
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedAccessToken.token;
  }

  let credentialsJson: ServiceAccountKey | null = null;

  if (process.env.RECAPTCHA_ENTERPRISE_CREDENTIALS) {
    try {
      const raw = process.env.RECAPTCHA_ENTERPRISE_CREDENTIALS.trim();
      const decoded = raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
      credentialsJson = JSON.parse(decoded);
    } catch (e) {
      console.error('[GCP Auth] Failed to parse RECAPTCHA_ENTERPRISE_CREDENTIALS:', e);
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS.trim();
      if (fs.existsSync(filePath)) {
        credentialsJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (e) {
      console.error('[GCP Auth] Failed to read GOOGLE_APPLICATION_CREDENTIALS file:', e);
    }
  }

  if (!credentialsJson?.client_email || !credentialsJson?.private_key) {
    return null;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: credentialsJson.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: credentialsJson.token_uri || 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodeBase64Url = (obj: any) =>
      Buffer.from(JSON.stringify(obj)).toString('base64url');

    const unsignedToken = `${encodeBase64Url(header)}.${encodeBase64Url(claimSet)}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsignedToken);
    signer.end();
    const signature = signer.sign(credentialsJson.private_key, 'base64url');

    const jwt = `${unsignedToken}.${signature}`;

    const tokenUri = credentialsJson.token_uri || 'https://oauth2.googleapis.com/token';
    const tokenRes = await fetch(tokenUri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }).toString(),
    });

    if (!tokenRes.ok) {
      console.error(`[GCP Auth] OAuth token exchange failed with status ${tokenRes.status}`);
      return null;
    }

    const tokenData = await tokenRes.json();
    cachedAccessToken = {
      token: tokenData.access_token,
      expiresAt: Date.now() + (tokenData.expires_in || 3600) * 1000,
    };

    return cachedAccessToken.token;
  } catch (err) {
    console.error('[GCP Auth] Error creating JWT assertion:', err);
    return null;
  }
}
