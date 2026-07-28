import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/api/payload';

export const revalidate = 3600; // ISR cache for 1 hour

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const payload = await getPayloadClient();
    
    // Fetch global settings to determine default indexability
    const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 0 }) as any;
    const defaultNoindex = siteSettings?.defaultRobots?.noindex === true;

    const posts = await payload.find({
      collection: 'blogs',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
      sort: '-publishedAt',
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const validPosts = posts.docs.filter((post: any) => {
      const isPostNoindex = post?.seo?.robots?.noindex;
      if (isPostNoindex === true) return false;
      if (isPostNoindex === undefined && defaultNoindex) return false;
      return true;
    });

    dynamicRoutes = validPosts.map((post: any) => {
      const postDateStr = post.publishedAt || post.createdAt;
      const postDate = postDateStr ? new Date(postDateStr) : new Date();
      const isRecent = postDate >= thirtyDaysAgo;

      return {
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.lastUpdated
          ? new Date(post.lastUpdated)
          : post.updatedAt
          ? new Date(post.updatedAt)
          : new Date(),
        changeFrequency: isRecent ? 'weekly' : 'monthly',
        priority: isRecent ? 0.8 : 0.6,
      };
    });
  } catch (err) {
    console.error('[sitemap] Failed to fetch posts:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
