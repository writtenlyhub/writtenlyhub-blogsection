import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function seedSuccessStories() {
  console.log('Seeding Success Stories...');
  const payload = await getPayload({ config });

  // Ensure category exists
  let category;
  const existingCategories = await payload.find({
    collection: 'success-story-categories',
    where: { name: { equals: 'HealthTech, Biotech & Wellness' } },
  });

  if (existingCategories.docs.length > 0) {
    category = existingCategories.docs[0];
  } else {
    category = await payload.create({
      collection: 'success-story-categories',
      data: {
        name: 'HealthTech, Biotech & Wellness',
      },
    });
  }

  const mediaItems = await payload.find({
    collection: 'media',
    limit: 1,
  });
  const mediaId = mediaItems.docs.length > 0 ? mediaItems.docs[0].id : null;

  if (!mediaId) {
    console.error('No media found to attach to required fields. Please seed media first.');
    process.exit(1);
  }

  // Create 15 success stories
  for (let i = 1; i <= 15; i++) {
    const title = `Success Story ${i}`;
    const slug = `success-story-${i}`;
    
    const existing = await payload.find({
      collection: 'success-stories',
      where: { slug: { equals: slug } },
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'success-stories',
        data: {
          title: title,
          clientName: `Client ${i}`,
          clientLogo: mediaId,
          featuredImage: mediaId,
          slug: slug,
          _status: 'published',
          category: category.id,
          shortDescription: `This is a short description for success story ${i}. It demonstrates how we helped the client achieve measurable growth in organic traffic, engagement, and conversions through a tailored content strategy and digital authority building.`,
          layout: [], // minimal block layout to pass validation if needed
        },
      });
      console.log(`Created ${title}`);
    } else {
      console.log(`${title} already exists`);
    }
  }

  console.log('Done!');
  process.exit(0);
}

seedSuccessStories();
