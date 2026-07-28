import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';
import { getNewsletterProvider } from '@/lib/newsletter/provider';
import { memoryRateLimiter } from '@/lib/rate-limit/memory';
import { z } from 'zod';
import crypto from 'crypto';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().optional(),
  website: z.string().optional(), // Honeypot
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting (5 requests per IP per 10 minutes)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = await memoryRateLimiter.check(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    // 2. Validation
    if (!parsed.success) {
      return NextResponse.json({ error: (parsed.error as any).errors?.[0]?.message || 'Invalid input' }, { status: 400 });
    }

    const { email, firstName, website, source } = parsed.data;

    // 3. Honeypot check
    if (website) {
      // Silently discard, fake success
      return NextResponse.json({ success: true, message: 'Check your email to confirm your subscription!' });
    }

    const payload = await getPayloadClient();

    // 4. Duplicate Check
    const existing = await payload.find({
      collection: 'subscribers',
      where: {
        email: { equals: email.toLowerCase() },
      },
    });

    if (existing.docs.length > 0) {
      const sub = existing.docs[0];
      if (sub.status === 'active') {
        return NextResponse.json({ success: true, message: "You're already subscribed." });
      }
      
      if (sub.status === 'unsubscribed') {
        // Option to resubscribe immediately or send double opt-in again.
        // For security, send double opt-in again.
      }
      // If pending, we will resend the opt-in below.
    }

    // 5. Generate Double Opt-In Token
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const confirmationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    let subscriberId;
    if (existing.docs.length > 0) {
      // Update existing
      subscriberId = existing.docs[0].id;
      await payload.update({
        collection: 'subscribers',
        id: subscriberId,
        data: {
          firstName: firstName || existing.docs[0].firstName,
          source: source || existing.docs[0].source,
          status: 'pending',
          confirmationToken,
          confirmationTokenExpiresAt,
        },
      });
    } else {
      // Create new
      const result = await payload.create({
        collection: 'subscribers',
        data: {
          email: email.toLowerCase(),
          firstName,
          source: source || 'API',
          status: 'pending',
          confirmationToken,
          confirmationTokenExpiresAt,
        },
      });
      subscriberId = result.id;
    }

    // 6. Send Confirmation Email
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const confirmationUrl = `${appUrl}/api/newsletter/confirm?token=${confirmationToken}`;

    const provider = await getNewsletterProvider();
    const emailSent = await provider.sendConfirmationEmail({
      email: email.toLowerCase(),
      firstName,
      source,
      confirmationUrl
    });

    if (!emailSent) {
      console.error('Failed to send confirmation email to:', email);
      // We still return success to the UI, as the issue is internal.
      // But in a real app, you might want to handle this differently.
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Check your email to confirm your subscription!' 
    });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
