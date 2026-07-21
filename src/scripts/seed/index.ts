import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../../payload.config';
import { seedMedia } from './media';
import { seedUsers } from './users';
import { seedCategories } from './categories';
import { seedTags } from './tags';
import { seedSiteSettings } from './siteSettings';
import { seedPosts } from './posts';

async function seed() {
  console.log('\n🌱 Starting Payload CMS Seed Process...\n');

  // Validate required environment variables
  const missingVars: string[] = [];
  if (!process.env.PAYLOAD_SECRET) missingVars.push('PAYLOAD_SECRET');
  if (!process.env.DATABASE_URI) missingVars.push('DATABASE_URI');

  if (missingVars.length > 0) {
    console.error(`❌ Seed aborted. Missing required environment variables:\n   - ${missingVars.join('\n   - ')}`);
    console.error('\nPlease ensure these are defined in your .env file before running the seed script.\n');
    process.exit(1);
  }

  try {
    const payload = await getPayload({ config });

    // 1. Seed Media
    const mediaIds = await seedMedia(payload);

    // 2. Seed Users
    const userIds = await seedUsers(payload, mediaIds);

    // 3. Seed Categories
    const categoryIds = await seedCategories(payload);

    // 4. Seed Tags
    const tagIds = await seedTags(payload);

    // 5. Seed Site Settings
    await seedSiteSettings(payload, mediaIds);

    // 6. Seed Posts
    await seedPosts(payload, mediaIds, userIds, categoryIds, tagIds);

    console.log('\n✅ Seed completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
