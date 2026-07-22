import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/api/payload';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic blog post routes
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const payload = await getPayloadClient();
    const posts = await payload.find({
      collection: 'blogs',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
      sort: '-publishedAt',
    });

    dynamicRoutes = posts.docs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.lastUpdated
        ? new Date(post.lastUpdated)
        : post.updatedAt
        ? new Date(post.updatedAt)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error('[sitemap] Failed to fetch posts:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
