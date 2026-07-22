import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { tags } = await request.json();
    
    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json({ error: 'Missing or invalid tags array' }, { status: 400 });
    }
    
    for (const tag of tags) {
      // @ts-expect-error Next.js 15 RC types require a second argument but it's optional at runtime
      revalidateTag(tag);
      console.log(`[API Revalidation] Revalidated tag: ${tag}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), tags });
  } catch (err) {
    console.error('[API Revalidation] Error:', err);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
