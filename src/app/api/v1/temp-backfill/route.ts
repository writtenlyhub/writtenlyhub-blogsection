import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const blogs = await payload.find({
      collection: 'blogs',
      limit: 1000,
      depth: 0,
    });
    
    let count = 0;
    for (const blog of blogs.docs) {
      await payload.update({
        collection: 'blogs',
        id: blog.id,
        data: blog, // Triggers beforeChange
        req: { payload } as any,
      });
      count++;
    }

    return NextResponse.json({ success: true, backfilled: count });
  } catch (error: any) {
    console.error('Backfill Error:', error);
    return NextResponse.json({ error: 'Failed to backfill', details: error.message }, { status: 500 });
  }
}
