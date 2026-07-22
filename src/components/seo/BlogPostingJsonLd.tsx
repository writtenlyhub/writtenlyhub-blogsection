import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';
const SITE_NAME = 'WrittenlyHub';
const LOGO_URL = `${SITE_URL}/images/logos/logo.svg`;

export interface BlogPostingJsonLdProps {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  imageAlt?: string;
  publishedAt: string; // ISO date string
  modifiedAt?: string; // ISO date string
  author: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  category: string;
  tags?: string[];
  /** If the article has FAQ items, pass them here to generate FAQPage schema */
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * JSON-LD for blog detail pages.
 * Emits: BlogPosting + BreadcrumbList + Person (author) + Organization (publisher)
 * Conditionally emits: FAQPage (if faqs are provided)
 */
export function BlogPostingJsonLd({
  title,
  description,
  slug,
  imageUrl,
  imageAlt,
  publishedAt,
  modifiedAt,
  author,
  category,
  tags = [],
  faqs = [],
}: BlogPostingJsonLdProps) {
  const articleUrl = `${SITE_URL}/blog/${slug}`;

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${articleUrl}/#blogposting`,
      headline: title,
      description,
      url: articleUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      image: {
        '@type': 'ImageObject',
        url: imageUrl || `${SITE_URL}/images/og/default-og.jpg`,
        // Declared as 1200×630 per OG standard — actual upload dimensions are not verified at runtime
        width: 1200,
        height: 630,
        caption: imageAlt || title,
      },
      datePublished: publishedAt,
      dateModified: modifiedAt || publishedAt,
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.bio ? { description: author.bio } : {}),
        ...(author.avatarUrl ? { image: author.avatarUrl } : {}),
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL,
          width: 200,
          height: 34,
        },
      },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
      ...(category ? { articleSection: category } : {}),
      inLanguage: 'en-US',
    },
    {
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
          name: title,
          item: articleUrl,
        },
      ],
    },
  ];

  // Conditionally add FAQPage schema
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  return <JsonLd data={schemas} />;
}
