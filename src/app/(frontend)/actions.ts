'use server';

import { getPayloadClient } from '@/lib/api/payload';

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const source = (formData.get('source') as string) || 'unknown';

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    const payload = await getPayloadClient();

    // Check if they already exist
    const existing = await payload.find({
      collection: 'subscribers',
      where: {
        email: { equals: email },
      },
    });

    if (existing.docs.length > 0) {
      // If unsubscribed, resubscribe them. If active, just say thanks.
      const sub = existing.docs[0];
      if (sub.status === 'unsubscribed') {
        await payload.update({
          collection: 'subscribers',
          id: sub.id,
          data: { status: 'active', source },
        });
        return { success: 'Welcome back! You have been successfully resubscribed.' };
      }
      return { success: 'You are already subscribed to our newsletter. Thank you!' };
    }

    // Create new subscriber
    await payload.create({
      collection: 'subscribers',
      data: {
        email,
        status: 'active',
        source,
      },
    });

    return { success: 'Thank you for subscribing! You will receive our next update soon.' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { error: 'Something went wrong. Please try again later.' };
  }
}
