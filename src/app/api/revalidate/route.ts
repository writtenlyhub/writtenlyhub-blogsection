import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1] || request.nextUrl.searchParams.get('secret');
    
    if (token !== process.env.PAYLOAD_SECRET) {
      console.warn(`[API Revalidation] Unauthorized attempt from ${request.headers.get('x-forwarded-for') || 'unknown IP'}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tags } = await request.json();
    
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid tags array' }, { status: 400 });
    }
    
    console.log(`[API Revalidation] Received authorized request to revalidate tags:`, tags);
    
    for (const tag of tags) {
      // @ts-expect-error Next.js 15 RC types require a second argument but it's optional at runtime
      revalidateTag(tag);
      console.log(`[API Revalidation] Executed revalidateTag('${tag}')`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), tags });
  } catch (err) {
    console.error('[API Revalidation] Error:', err);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
