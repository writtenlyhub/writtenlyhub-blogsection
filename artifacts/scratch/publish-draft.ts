import { getPayload } from 'payload';
import config from '../../src/payload.config';

async function run() {
  const payload = await getPayload({ config });

  console.log('1. Publishing the draft post...');
  
  const publishedPost = await payload.update({
    collection: 'blogs',
    id: 19,
    overrideAccess: true,
    data: {
      _status: 'published',
    },
  });

  console.log(`Published post: ${publishedPost.title}`);
}
run().catch(console.error);
