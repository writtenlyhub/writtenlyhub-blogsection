import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  const title = `Persistent Cache Test ${Date.now()}`;
  const users = await payload.find({ collection: 'users', limit: 1 });
  const categories = await payload.find({ collection: 'categories', limit: 1 });
  const media = await payload.find({ collection: 'media', limit: 1 });

  const post = await payload.create({
    collection: 'blogs',
    data: {
      title: title,
      _status: 'published',
      publishedAt: new Date().toISOString(),
      author: users.docs[0].id,
      category: categories.docs[0].id,
      featuredImage: media.docs[0].id,
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [{ type: 'text', text: 'Detail page test', version: 1 }]
            }
          ]
        }
      }
    }
  });

  console.log(`Created slug: ${post.slug}`);

  // Wait 1 second for cache invalidation
  await new Promise(r => setTimeout(r, 1000));

  const detailUrl = `http://localhost:3000/blog/${post.slug}`;
  console.log(`Fetching ${detailUrl}...`);
  
  const res = await fetch(detailUrl, { cache: 'no-store' });
  console.log(`Response Status: ${res.status}`);
  
  process.exit(0);
}

run().catch(console.error);
