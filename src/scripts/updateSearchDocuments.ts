import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

async function run() {
  const payload = await getPayload({ config: configPromise });

  const blogs = await payload.find({
    collection: 'blogs',
    limit: 1000,
  });

  console.log(`Found ${blogs.totalDocs} blogs to update.`);

  let updated = 0;
  let errors = 0;

  for (const doc of blogs.docs) {
    try {
      // payload.update triggers the hooks which will re-generate the searchDocument
      await payload.update({
        collection: 'blogs',
        id: doc.id,
        data: {
          // Just pass title to trigger update without changing anything else
          title: doc.title,
        },
      });
      updated++;
      console.log(`Updated blog ${doc.slug}`);
    } catch (e) {
      console.error(`Failed to update blog ${doc.slug}`, e);
      errors++;
    }
  }

  console.log(`Completed. Updated: ${updated}, Errors: ${errors}`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
