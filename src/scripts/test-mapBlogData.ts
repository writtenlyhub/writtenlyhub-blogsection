import 'dotenv/config';
import config from '@payload-config';
import { getPayload } from 'payload';
import { mapBlogData } from '../lib/utils/blogMapper';

async function main() {
  const payload = await getPayload({ config });
  
  const result = await payload.find({
    collection: 'blogs',
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 100,
  });

  console.log('Available slugs:', result.docs.map(d => d.slug));
  const post = result.docs[0];
  if (!post) {
    console.error('Post not found');
    process.exit(1);
  }

  console.log('Post found in Payload. Mapping data...');
  
  try {
    const blogData = mapBlogData(post as any);
    console.log('mapBlogData successful');
  } catch (error) {
    console.error('mapBlogData threw an error:', error);
  }
  
  process.exit(0);
}

main().catch(console.error);
