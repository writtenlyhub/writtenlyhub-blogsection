import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function diagnose() {
  const payload = await getPayload({ config });
  
  const posts = await payload.find({
    collection: 'blogs',
    limit: 1,
  });

  if (posts.docs.length === 0) {
    console.log('No posts found.');
    process.exit(1);
  }

  const post = posts.docs[0];
  console.log(`\n=== DIAGNOSTIC PHASE 1 ===`);
  console.log(`Original Title in DB: "${post.title}"`);

  const updatedPost = await payload.update({
    collection: 'blogs',
    id: post.id,
    data: {
      title: `[DIAGNOSTIC] ${post.title}`,
    },
  });

  console.log(`Updated Title returned from update(): "${updatedPost.title}"`);

  const fetchedPost = await payload.find({
    collection: 'blogs',
    where: { id: { equals: post.id } },
  });

  console.log(`Title fetched from Local API: "${fetchedPost.docs[0].title}"`);
  
  await payload.update({
    collection: 'blogs',
    id: post.id,
    data: {
      title: post.title, // Reset
    },
  });
  
  process.exit(0);
}

diagnose();
