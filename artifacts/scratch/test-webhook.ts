import dotenv from 'dotenv';
dotenv.config();
import { getPayload } from 'payload';
import config from '../../src/payload.config';

async function run() {
  const payload = await getPayload({ config });
  console.log('1. Fetching a published post...');
  
  const result = await payload.find({
    collection: 'blogs',
    where: { _status: { equals: 'published' } },
    limit: 1,
  });

  if (result.docs.length === 0) {
    throw new Error('No published blog posts found. Seed the DB first.');
  }

  const post = result.docs[0];
  const newTitle = `Updated Title ${Date.now()}`;
  console.log(`2. Found post: ${post.slug}. Updating title to: ${newTitle}`);

  const updatedPost = await payload.update({
    collection: 'blogs',
    id: post.id,
    data: {
      title: newTitle,
    },
  });

  console.log(`3. Post updated in Payload. Giving the webhook 2 seconds to process...`);
  await new Promise(r => setTimeout(r, 2000));

  console.log(`4. Fetching the live frontend for slug: ${post.slug}...`);
  const liveRes = await fetch(`http://localhost:3000/blog/${post.slug}`);
  if (liveRes.status !== 200) {
    throw new Error(`Live page returned status: ${liveRes.status}`);
  }

  const html = await liveRes.text();
  if (html.includes(newTitle)) {
    console.log(`5. SUCCESS: The live page HTML contains the new title!`);
  } else {
    console.error(`5. FAILED: The live page HTML does NOT contain the new title!`);
  }
}

run().catch(console.error).finally(() => process.exit(0));
