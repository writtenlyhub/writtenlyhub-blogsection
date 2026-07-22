import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function seedHomepageSettings() {
  console.log('Seeding Homepage Settings...');
  const payload = await getPayload({ config });
  
  const categories = await payload.find({
    collection: 'categories',
    limit: 3,
  });

  if (categories.docs.length > 0) {
    await payload.updateGlobal({
      slug: 'homepage-settings',
      data: {
        curatedCategories: categories.docs.map(c => c.id),
      },
    });
    console.log(`Successfully seeded HomepageSettings with ${categories.docs.length} categories.`);
  } else {
    console.log('No categories found to seed.');
  }
  process.exit(0);
}

seedHomepageSettings().catch(console.error);
