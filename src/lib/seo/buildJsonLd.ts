import { buildCanonicalUrl } from './buildCanonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export function buildJsonLd({
  post,
  siteSettings,
  slug,
  pathPrefix = '/blog/',
  extractedFaqs = [],
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  slug: string;
  pathPrefix?: string;
  extractedFaqs?: { question: string; answer: string }[];
}): Record<string, any>[] {
  const seo = post?.seo || {};
  const globalSeo = siteSettings || {};
  
  const seoTitle = seo.metaTitle || post?.title || globalSeo?.siteTitle || 'WrittenlyHub';
  const seoDescription = seo.metaDescription || post?.excerpt || globalSeo?.siteDescription || '';
  
  const articleUrl = buildCanonicalUrl(seo.canonicalUrl, slug, pathPrefix);
  
  const featuredImageMedia = post?.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null;
  const seoImageMedia = seo.ogImage && typeof seo.ogImage === 'object' ? seo.ogImage : null;
  const globalImageMedia = globalSeo?.defaultOgImage && typeof globalSeo.defaultOgImage === 'object' ? globalSeo.defaultOgImage : null;
  
  const imageUrl = seoImageMedia?.url || featuredImageMedia?.url || globalImageMedia?.url || `${SITE_URL}/images/og/default-og.jpg`;
  
  const authorName = post?.author?.name || 'WrittenlyHub';
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tags = (post?.tags || []).map((t: any) => t.tag).filter(Boolean);
  const categoryName = post?.category && typeof post.category === 'object' ? post.category.title : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [];

  // 1. Generated Article JSON-LD
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}/#blogposting`,
    headline: seoTitle,
    description: seoDescription,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post?.publishedAt || post?.createdAt || undefined,
    dateModified: post?.lastUpdated || post?.updatedAt || undefined,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: globalSeo?.organizationSchema?.name || globalSeo?.siteTitle || 'WrittenlyHub',
      logo: globalSeo?.organizationSchema?.logo?.url ? {
        '@type': 'ImageObject',
        url: globalSeo.organizationSchema.logo.url,
      } : undefined,
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
    ...(categoryName ? { articleSection: categoryName } : {}),
    inLanguage: 'en-US',
  });

  // 2. Generated Breadcrumb JSON-LD
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post?.title || 'Article',
        item: articleUrl,
      },
    ],
  });

  // 3. Optional FAQ JSON-LD
  const manualFaqs = seo.jsonLd?.faq || [];
  const allFaqs = [...extractedFaqs, ...manualFaqs];
  if (allFaqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mainEntity: allFaqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // 4. Optional HowTo JSON-LD
  const howTo = seo.jsonLd?.howTo;
  if (howTo && howTo.name && howTo.step && howTo.step.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      step: howTo.step.map((step: any) => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text,
        url: step.url,
        ...(step.image?.url ? { image: step.image.url } : {})
      }))
    });
  }

  // 5. Advanced Override JSON-LD
  const advancedOverrideStr = seo.jsonLd?.advancedOverride;
  if (advancedOverrideStr) {
    try {
      const parsedOverride = JSON.parse(advancedOverrideStr);
      if (Array.isArray(parsedOverride)) {
        schemas.push(...parsedOverride);
      } else if (typeof parsedOverride === 'object') {
        schemas.push(parsedOverride);
      }
    } catch (e) {
      console.error('Failed to parse advancedOverride JSON-LD', e);
    }
  }

  return schemas;
}
