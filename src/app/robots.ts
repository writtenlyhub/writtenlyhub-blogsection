import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/blog', '/blog/*'],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/_next/*',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
