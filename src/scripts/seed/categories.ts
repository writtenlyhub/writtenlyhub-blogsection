import type { Payload } from 'payload';

export async function seedCategories(payload: Payload) {
  payload.logger.info('— Seeding Categories...');

  const categories = [
    { name: 'SEO', description: 'Search Engine Optimization strategies and tips.', color: '#3b82f6', slug: 'seo' },
    { name: 'Content Marketing', description: 'Content marketing best practices.', color: '#10b981', slug: 'content-marketing' },
    { name: 'AI Writing', description: 'The future of AI in content creation.', color: '#8b5cf6', slug: 'ai-writing' },
    { name: 'Blogging', description: 'Tips to grow and manage your blog.', color: '#ec4899', slug: 'blogging' },
    { name: 'Copywriting', description: 'High-converting copywriting techniques.', color: '#f59e0b', slug: 'copywriting' },
    { name: 'Digital Marketing', description: 'Broad digital marketing insights.', color: '#6366f1', slug: 'digital-marketing' },
  ];

  const results: Record<string, string> = {};

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: cat.slug,
        },
      },
    });

    if (existing.docs.length > 0) {
      results[cat.slug] = existing.docs[0].id;
      continue;
    }

    try {
      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          color: cat.color,
        },
      });
      results[cat.slug] = created.id;
    } catch (e) {
      payload.logger.error(`Failed to create category ${cat.name}: ${e}`);
    }
  }

  payload.logger.info(`✓ Categories seeded (${Object.keys(results).length} items)`);
  return results;
}
