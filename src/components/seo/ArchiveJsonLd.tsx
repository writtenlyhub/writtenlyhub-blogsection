import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';
const SITE_NAME = 'WrittenlyHub';

/**
 * JSON-LD for the blog archive page.
 * Emits: CollectionPage + BreadcrumbList + WebPage
 */
export function ArchiveJsonLd() {
  const archiveUrl = `${SITE_URL}/blog`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${archiveUrl}/#collectionpage`,
      name: `Blog Archive — ${SITE_NAME}`,
      description:
        'Browse all articles, guides, and resources published on the WrittenlyHub blog.',
      url: archiveUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
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
          item: archiveUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: archiveUrl,
      name: `Blog Archive — ${SITE_NAME}`,
      description:
        'Browse all articles, guides, and resources published on the WrittenlyHub blog.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ];

  return <JsonLd data={schemas} />;
}
