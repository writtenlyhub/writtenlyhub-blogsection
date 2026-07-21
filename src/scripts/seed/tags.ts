import type { Payload } from 'payload';

export async function seedTags(payload: Payload) {
  payload.logger.info('— Seeding Tags...');

  const tagNames = [
    'ChatGPT', 'AI', 'SaaS', 'Marketing', 'Startups', 
    'Content Strategy', 'Google', 'Search', 'Web Design', 
    'UX', 'Freelancing', 'Productivity', 'Social Media',
    'Lead Generation', 'Email Marketing'
  ];

  const results: Record<string, number> = {};

  for (const tagName of tagNames) {
    const slug = tagName.toLowerCase().replace(/ /g, '-');
    
    const existing = await payload.find({
      collection: 'tags',
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (existing.docs.length > 0) {
      results[slug] = existing.docs[0].id;
      continue;
    }

    try {
      const created = await payload.create({
        collection: 'tags',
        data: {
          name: tagName,
          slug: slug,
        },
      });
      results[slug] = created.id;
    } catch (e) {
      payload.logger.error(`Failed to create tag ${tagName}: ${e}`);
    }
  }

  payload.logger.info(`✓ Tags seeded (${Object.keys(results).length} items)`);
  return results;
}
