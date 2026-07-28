import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';
import { getNewsletterProvider } from '@/lib/newsletter/provider';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Invalid confirmation link.', { status: 400 });
    }

    const payload = await getPayloadClient();

    // Find the subscriber with this token
    const result = await payload.find({
      collection: 'subscribers',
      where: {
        confirmationToken: { equals: token },
      },
    });

    if (result.docs.length === 0) {
      return new NextResponse('Invalid or expired confirmation link.', { status: 400 });
    }

    const subscriber = result.docs[0];

    // Check expiration
    if (
      !subscriber.confirmationTokenExpiresAt || 
      new Date(subscriber.confirmationTokenExpiresAt) < new Date()
    ) {
      return new NextResponse('Confirmation link has expired. Please subscribe again.', { status: 400 });
    }

    // Mark as confirmed
    const confirmedAt = new Date().toISOString();
    
    await payload.update({
      collection: 'subscribers',
      id: subscriber.id,
      data: {
        status: 'active',
        confirmationToken: null,
        confirmationTokenExpiresAt: null,
        confirmedAt,
        subscribedAt: confirmedAt,
      },
    });

    // Sync with External Provider
    try {
      const provider = await getNewsletterProvider();
      await provider.addSubscriber({
        email: subscriber.email,
        firstName: subscriber.firstName || undefined,
        source: subscriber.source || undefined,
      });
    } catch (e) {
      console.error('Failed to sync confirmed subscriber to external provider:', e);
      // We don't fail the request here, as they are confirmed in our DB.
    }

    // Redirect to home with a success message
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${appUrl}/?newsletter=confirmed`);

  } catch (error) {
    console.error('Newsletter confirm error:', error);
    return new NextResponse('Something went wrong.', { status: 500 });
  }
}
