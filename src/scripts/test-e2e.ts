import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function testE2E() {
  console.log('=== VERIFYING E2E CACHE INVALIDATION ===');
  
  const payload = await getPayload({ config });
  
  const uniqueTitle = `[CACHE TEST] ${Date.now()}`;
  console.log(`\n1. Creating new published article: "${uniqueTitle}"`);
  
  const users = await payload.find({ collection: 'users', limit: 1 });
  const categories = await payload.find({ collection: 'categories', limit: 1 });
  const media = await payload.find({ collection: 'media', limit: 1 });

  const newPost = await payload.create({
    collection: 'blogs',
    data: {
      title: uniqueTitle,
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
              children: [{ type: 'text', text: 'Cache test content', version: 1 }]
            }
          ]
        }
      }
    }
  });

  console.log(`   -> Created post ID: ${newPost.id}, Slug: ${newPost.slug}`);

  // Wait 1 second for the background fetch(/api/revalidate) to hit the Next.js server
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('\n2. Querying Next.js Rendered Homepage (http://localhost:3000/)');
  try {
    const response = await fetch('http://localhost:3000/', { cache: 'no-store' });
    const html = await response.text();
    
    if (html.includes(uniqueTitle)) {
      console.log(`   -> SUCCESS: Post found in rendered HTML! Cache was successfully invalidated.`);
    } else {
      console.log(`   -> FAILED: Post NOT found in rendered HTML.`);
    }
  } catch (err) {
    console.log(`   -> FAILED: Could not fetch frontend. Error: ${err}`);
  }

  // Cleanup
  console.log('\nCleaning up test data...');
  await payload.delete({
    collection: 'blogs',
    id: newPost.id,
  });
  console.log('Done.');
  process.exit(0);
}

testE2E().catch(console.error);
