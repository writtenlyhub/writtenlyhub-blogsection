import { NextResponse } from 'next/server';
import { getCachedPosts } from '@/lib/api';

export async function GET() {
  const posts = await getCachedPosts(50, 1);
  return NextResponse.json({
    count: posts.docs.length,
    titles: posts.docs.map(p => p.title)
  });
}
