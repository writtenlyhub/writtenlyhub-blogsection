'use server';

import { headers } from 'next/headers';
import { verifyRecaptchaToken } from '@/lib/recaptcha/verify';

interface ActionResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const name = (formData.get('name_and_company') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const projectDescription = (formData.get('project_description') as string)?.trim();
  const recaptchaToken = (formData.get('g-recaptcha-response') as string)?.trim();

  // 1. Server-side security verification: reCAPTCHA Enterprise verification
  let remoteIp: string | undefined;
  try {
    const headersList = await headers();
    remoteIp = headersList.get('x-forwarded-for')?.split(',')[0]?.trim();
  } catch {
    // Non-critical if headers lookup fails in test or static contexts
  }

  const captchaResult = await verifyRecaptchaToken(recaptchaToken, {
    remoteIp,
    expectedAction: 'CONTACT_FORM',
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  });

  if (!captchaResult.success) {
    // Abort processing immediately: no email, no notification, no processing
    return {
      success: false,
      message: captchaResult.message,
    };
  }

  // 2. Field-level validation
  if (!name || name.length < 2) {
    return { success: false, message: 'Please enter your name and company.' };
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!projectDescription || projectDescription.length < 20) {
    return {
      success: false,
      message: 'Please describe your project in at least 20 characters.',
    };
  }

  // 3. Process verified submission (Only reached if reCAPTCHA verification passed completely)
  console.log('[Contact Form Submission - Verified]', {
    name,
    email,
    phone: phone || 'Not provided',
    projectDescription,
    hostname: captchaResult.hostname || 'localhost',
    method: captchaResult.verificationMethod,
    action: captchaResult.action || 'CONTACT_FORM',
    submittedAt: new Date().toISOString(),
  });

  return {
    success: true,
    message:
      "Thank you! We've received your message and will get back to you within 24 hours.",
  };
}
