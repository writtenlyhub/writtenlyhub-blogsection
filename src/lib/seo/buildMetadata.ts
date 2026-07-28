import type { Metadata } from 'next';
import { buildCanonicalUrl } from './buildCanonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export function buildMetadata({
  post,
  siteSettings,
  slug,
  pathPrefix = '/blog/',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  slug: string;
  pathPrefix?: string;
}): Metadata {
  const seo = post?.seo || {};
  
  // SEO priority: Post Override -> Global SEO Settings -> Generated Default
  const seoTitle = seo.metaTitle || post?.title || siteSettings?.siteTitle || 'WrittenlyHub';
  const seoDescription = seo.metaDescription || post?.excerpt || siteSettings?.siteDescription || '';
  
  const canonicalUrl = buildCanonicalUrl(seo.canonicalUrl, slug, pathPrefix);

  // Robots Directives
  const isDraft = post?._status === 'draft';
  const globalRobots = siteSettings?.defaultRobots || {};
  const postRobots = seo.robots || {};
  
  let index = true;
  let follow = true;
  if (isDraft) {
    index = false;
  } else {
    // If post overrides are set, use them; otherwise use global defaults
    index = postRobots.index !== undefined ? postRobots.index : (globalRobots.index !== undefined ? globalRobots.index : true);
    if (postRobots.noindex || (postRobots.noindex === undefined && globalRobots.noindex)) {
      index = false;
    }
  }

  follow = postRobots.follow !== undefined ? postRobots.follow : (globalRobots.follow !== undefined ? globalRobots.follow : true);
  if (postRobots.nofollow || (postRobots.nofollow === undefined && globalRobots.nofollow)) {
    follow = false;
  }

  // Combine robots directives
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const robots: any = { index, follow };
  if (postRobots.noarchive || globalRobots.noarchive) robots.noarchive = true;
  if (postRobots.nosnippet || globalRobots.nosnippet) robots.nosnippet = true;
  if (postRobots.noimageindex || globalRobots.noimageindex) robots.noimageindex = true;
  
  const maxSnippet = postRobots.maxSnippet || globalRobots.maxSnippet;
  if (maxSnippet) robots.maxSnippet = maxSnippet;
  const maxImagePreview = postRobots.maxImagePreview || globalRobots.maxImagePreview;
  if (maxImagePreview) robots.maxImagePreview = maxImagePreview;
  const maxVideoPreview = postRobots.maxVideoPreview || globalRobots.maxVideoPreview;
  if (maxVideoPreview) robots.maxVideoPreview = maxVideoPreview;

  // Images
  const seoImageMedia = seo.ogImage && typeof seo.ogImage === 'object' ? seo.ogImage : null;
  const featuredImageMedia = post?.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null;
  const globalImageMedia = siteSettings?.defaultOgImage && typeof siteSettings.defaultOgImage === 'object' ? siteSettings.defaultOgImage : null;
  
  // Custom OG Image fallback: 
  // Custom OG -> Featured Image -> Default OG -> Vercel OG Generator
  let ogImageUrl = seoImageMedia?.url || featuredImageMedia?.url || globalImageMedia?.url;
  
  if (!ogImageUrl) {
    // Generate dynamic OG image using vercel/og (assuming the route exists)
    const encodedTitle = encodeURIComponent(seoTitle);
    const authorName = post?.author?.name ? encodeURIComponent(post.author.name) : 'WrittenlyHub';
    ogImageUrl = `${SITE_URL}/api/og?title=${encodedTitle}&author=${authorName}`;
  }

  const twitterCard = siteSettings?.defaultTwitterCard || 'summary_large_image';
  const authorName = post?.author?.name || 'WrittenlyHub';
  
  // Hreflang
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alternates: any = {
    canonical: canonicalUrl,
    languages: {
      'en': canonicalUrl,
    }
  };

  return {
    title: seoTitle,
    description: seoDescription,
    alternates,
    robots,
    openGraph: {
      title: seo.ogTitle || seoTitle,
      description: seo.ogDescription || seoDescription,
      type: 'article',
      url: canonicalUrl,
      siteName: siteSettings?.siteTitle || 'WrittenlyHub',
      publishedTime: post?.publishedAt || post?.createdAt || undefined,
      modifiedTime: post?.lastUpdated || post?.updatedAt || undefined,
      authors: [authorName],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: seo.twitterTitle || seo.ogTitle || seoTitle,
      description: seo.twitterDescription || seo.ogDescription || seoDescription,
      images: [seo.twitterImage?.url || ogImageUrl],
    },
  };
}
