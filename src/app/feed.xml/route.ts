import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';
const SITE_NAME = 'WrittenlyHub Blog';
const SITE_DESCRIPTION =
  'Expert guides, SEO strategies, AI updates and content marketing resources from WrittenlyHub.';

/** Convert a Date to RFC 822 format required by RSS 2.0 */
function toRFC822(date: string | Date): string {
  return new Date(date).toUTCString();
}

/** Escape XML special characters */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<NextResponse> {
  let items = '';

  try {
    const payload = await getPayloadClient();
    const posts = await payload.find({
      collection: 'blogs',
      where: { _status: { equals: 'published' } },
      limit: 20,
      depth: 2,
      sort: '-publishedAt',
    });

    items = posts.docs
      .map((post) => {
        const authorName =
          post.author && typeof post.author === 'object' ? (post.author as any).name : 'WrittenlyHub';
        const categoryName =
          post.category && typeof post.category === 'object'
            ? (post.category as any).name
            : 'Uncategorized';
        const pubDate = post.publishedAt ? toRFC822(post.publishedAt) : toRFC822(post.createdAt);
        const link = `${SITE_URL}/blog/${post.slug}`;
        const description = escapeXml(post.excerpt || post.title);

        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(authorName)}</author>
      <category>${escapeXml(categoryName)}</category>
    </item>`;
      })
      .join('');
  } catch (err) {
    console.error('[feed.xml] Failed to fetch posts:', err);
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
