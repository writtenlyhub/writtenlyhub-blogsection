import type { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/api/payload';
import { buildCanonicalUrl } from '@/lib/seo/buildCanonical';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com').replace(/\/$/, '');

// This endpoint must read the current published CMS state on every request.
// A build-time sitemap would miss content published after the deployment.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SitemapPost = {
  slug?: string | null;
  contentType?: 'blog' | 'news' | string | null;
  _status?: string | null;
  seo?: {
    canonicalUrl?: string | null;
    robots?: {
      index?: boolean;
      noindex?: boolean;
    } | null;
  } | null;
  publishedAt?: string | null;
  publishedDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  lastUpdated?: string | null;
};

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
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    const payload = await getPayloadClient();
    const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 0 }) as {
      defaultRobots?: { index?: boolean; noindex?: boolean };
    };
    const defaultRobots = siteSettings?.defaultRobots || {};

    // Disable pagination so the sitemap isn't capped at the first 1,000 posts.
    const result = await payload.find({
      collection: 'blogs',
      where: {
        _status: { equals: 'published' },
      },
      pagination: false,
      depth: 0,
      sort: '-publishedAt',
    });

    const posts = result.docs as SitemapPost[];
    const urls: MetadataRoute.Sitemap = [];

    for (const post of posts) {
      const slug = post.slug?.trim();
      if (!slug) continue;

      const contentType = post.contentType === 'news' ? 'news' : 'blog';
      const postRobots = post.seo?.robots || {};
      const isNoindex =
        postRobots.noindex === true ||
        postRobots.index === false ||
        (postRobots.noindex === undefined &&
          postRobots.index === undefined &&
          (defaultRobots.noindex === true || defaultRobots.index === false));

      if (isNoindex) continue;

      // Use the same canonical URL logic as the article metadata. This keeps
      // sitemap locations aligned with each page's declared preferred URL.
      const canonical = buildCanonicalUrl(
        post.seo?.canonicalUrl,
        slug,
        `/${contentType}/`,
      );

      let canonicalUrl: URL;
      try {
        canonicalUrl = new URL(canonical);
        if (canonicalUrl.protocol !== 'https:' && canonicalUrl.protocol !== 'http:') continue;
      } catch {
        // Never publish malformed URLs into an XML sitemap.
        continue;
      }

      const lastModified = post.lastUpdated || post.updatedAt || post.publishedAt || post.publishedDate || post.createdAt;
      const modifiedDate = lastModified ? new Date(lastModified) : undefined;

      urls.push({
        url: canonicalUrl.toString(),
        ...(modifiedDate && !Number.isNaN(modifiedDate.getTime())
          ? { lastModified: modifiedDate }
          : {}),
        changeFrequency: 'monthly',
        priority: contentType === 'news' ? 0.7 : 0.6,
      });
    }

    // Keep stable static entries and avoid duplicate URLs if a CMS canonical
    // override points at a URL already present in the sitemap.
    const seen = new Set<string>();
    return [...staticRoutes, ...urls].filter((entry) => {
      const normalized = entry.url.replace(/\/$/, '') || SITE_URL;
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
  } catch (err) {
    console.error('[sitemap] Failed to fetch published CMS posts:', err);
    // Keep the static routes available during a temporary CMS/database outage.
    return staticRoutes;
  }
}
