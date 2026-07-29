import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { getPayload } from 'payload';
import config from './src/payload.config';

async function backfill() {
  const payload = await getPayload({ config });
  console.log('Starting searchDocument backfill...');
  try {
    const blogs = await payload.find({
      collection: 'blogs',
      limit: 1000,
      depth: 0,
    });
    console.log(`Found ${blogs.docs.length} blogs to backfill.`);
    
    let count = 0;
    for (const blog of blogs.docs) {
      await payload.update({
        collection: 'blogs',
        id: blog.id,
        data: blog, // This triggers the beforeChange hook
      });
      count++;
      console.log(`Updated ${count}/${blogs.docs.length}: ${blog.title}`);
    }
    console.log('Backfill complete!');
  } catch (err) {
    console.error('Error backfilling searchDocument:', err);
  }
  process.exit(0);
}

backfill();
