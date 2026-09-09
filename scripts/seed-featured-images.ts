import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../src/payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  // Find all media
  const mediaRes = await payload.find({
    collection: 'media',
    limit: 10,
  });

  if (mediaRes.docs.length === 0) {
    console.log('No media found.');
    process.exit(1);
  }

  const defaultMediaId = mediaRes.docs[0].id;
  console.log('Using Media ID for fallback:', defaultMediaId);

  // Update Blogs
  const blogs = await payload.find({ collection: 'blogs', limit: 100 });
  for (const blog of blogs.docs) {
    if (!blog.featuredImage) {
      console.log(`Updating Blog: ${blog.title}`);
      await payload.update({
        collection: 'blogs',
        id: blog.id,
        data: { featuredImage: defaultMediaId }
      });
    }
  }

  // Update Success Stories
  const stories = await payload.find({ collection: 'success-stories', limit: 100 });
  for (const story of stories.docs) {
    if (!story.featuredImage) {
      console.log(`Updating Success Story: ${story.title}`);
      await payload.update({
        collection: 'success-stories',
        id: story.id,
        data: { featuredImage: defaultMediaId }
      });
    }
  }

  console.log('Done!');
  process.exit(0);
}

run();
