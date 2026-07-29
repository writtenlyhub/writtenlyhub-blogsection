import { NextResponse } from 'next/server';
import { searchService } from '@/lib/search/SearchService';
import { memoryRateLimiter } from '@/lib/rate-limit/memory';

export async function GET(request: Request) {
  // 1. Rate Limiting
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { success } = await memoryRateLimiter.check(ip, 30, 60 * 1000);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many search requests. Please try again later.' },
      { status: 429 }
    );
  }

  // 2. Query extraction & validation
  const { searchParams } = new URL(request.url);
  let q = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  
  q = q.trim();

  if (!q) {
    return NextResponse.json({
      results: [],
      total: 0,
      query: '',
      searchTimeMs: 0
    });
  }

  // 3. Execute Search
  try {
    const response = await searchService.search(q, { cursor: page, limit: 10 });
    
    // 4. Return with caching headers (Next.js App Router style)
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      }
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}