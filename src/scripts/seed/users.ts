import type { Payload } from 'payload';

export async function seedUsers(payload: Payload, mediaIds: Record<string, string>) {
  payload.logger.info('— Seeding Users...');

  const users = [
    {
      email: 'admin@writtenlyhub.com',
      password: 'password123',
      name: 'WrittenlyHub Admin',
      role: 'admin',
      designation: 'Administrator',
      bio: 'System Administrator for WrittenlyHub.',
      avatar: mediaIds['avatar-1.svg'],
    },
    {
      email: 'sarah.content@writtenlyhub.com',
      password: 'password123',
      name: 'Sarah Content',
      role: 'author',
      designation: 'Lead Content Strategist',
      bio: 'Sarah is a passionate content creator with over 10 years of experience in digital marketing and SEO.',
      avatar: mediaIds['avatar-2.svg'],
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    {
      email: 'mark.seo@writtenlyhub.com',
      password: 'password123',
      name: 'Mark SEO',
      role: 'author',
      designation: 'Growth Specialist',
      bio: 'Mark specializes in scaling organic traffic and building robust technical SEO strategies.',
      avatar: mediaIds['avatar-1.svg'],
      linkedin: 'https://linkedin.com',
    },
  ];

  const results: Record<string, string> = {};

  for (const user of users) {
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: user.email,
        },
      },
    });

    if (existing.docs.length > 0) {
      results[user.email] = existing.docs[0].id;
      continue;
    }

    try {
      const created = await payload.create({
        collection: 'users',
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
          role: user.role,
          designation: user.designation,
          bio: user.bio,
          avatar: user.avatar,
          linkedin: user.linkedin,
          twitter: user.twitter,
        },
      });
      results[user.email] = created.id;
    } catch (e) {
      payload.logger.error(`Failed to create user ${user.email}: ${e}`);
    }
  }

  payload.logger.info(`✓ Users seeded (${Object.keys(results).length} items)`);
  return results;
}
