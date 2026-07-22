import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';
const SITE_NAME = 'WrittenlyHub';
const LOGO_URL = `${SITE_URL}/images/logos/logo.svg`;

/**
 * JSON-LD for the homepage.
 * Emits: Organization + WebSite + SearchAction + WebPage
 */
export function HomepageJsonLd() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 200,
        height: 34,
      },
      sameAs: [
        'https://twitter.com/WrittenlyHub',
        'https://www.linkedin.com/company/writtenlyhub',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} Blog — Expert Guides, SEO & Content Marketing`,
      description:
        'Explore insightful articles, expert guides, SEO strategies, AI updates and content marketing resources from WrittenlyHub.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ];

  return <JsonLd data={schemas} />;
}
