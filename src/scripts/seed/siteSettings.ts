import type { Payload } from 'payload';

export async function seedSiteSettings(payload: Payload, mediaIds: Record<string, number>) {
  payload.logger.info('— Seeding Site Settings...');

  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        heroTitle: 'WrittenlyHub Blog & Insights',
        heroDescription: 'Expert strategies, industry insights, and the latest trends in content and digital marketing.',
        siteTitle: 'WrittenlyHub Blog | Elevate Your Content',
        siteDescription: 'Discover expert articles on content strategy, SEO, and digital marketing. Let WrittenlyHub help you grow your online presence.',
        defaultOgImage: mediaIds['cover-1.svg'] as any,
        contactEmail: 'hello@writtenlyhub.com',
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com/writtenlyhub' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/writtenlyhub' },
        ],
      },
    });
    
    payload.logger.info('✓ Site Settings seeded');
  } catch (e) {
    payload.logger.error(`Failed to update site settings: ${e}`);
  }
}
