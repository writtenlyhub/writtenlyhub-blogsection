import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../../payload.config';
import { seedNews } from './news';

async function run() {
  console.log('\n🌱 Seeding News Articles into Local Database...\n');

  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
    console.error('❌ Missing PAYLOAD_SECRET or DATABASE_URI in .env');
    process.exit(1);
  }

  try {
    const payload = await getPayload({ config });
    await seedNews(payload);
    console.log('\n✅ News articles seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ News seed failed:', error);
    process.exit(1);
  }
}

run();
