import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function run() {
  const payload = await getPayload({config});
  const storyRes = await payload.find({collection: 'success-stories', where: { slug: { equals: 'upgrad-abroad' }}});
  if (storyRes.docs.length === 0) {
    console.log("Not found"); process.exit(1);
  }
  const story = storyRes.docs[0];

  const logoRes = await payload.find({collection: 'media', where: { filename: { contains: 'upgrad-abroad-logo' }}});
  const identityRes = await payload.find({collection: 'media', where: { filename: { contains: 'upgrad-abroad-brand-identity' }}});
  const mayankRes = await payload.find({collection: 'media', where: { filename: { contains: 'mayank-kumar-testimonial' }}});

  const updates: any = {};
  if (logoRes.docs.length > 0) updates.clientLogo = logoRes.docs[0].id;
  if (identityRes.docs.length > 0) updates.featuredImage = identityRes.docs[0].id;
  if (mayankRes.docs.length > 0) {
    updates.clientVisual = mayankRes.docs[0].id;
    if (story.testimonial) {
      updates.testimonial = { ...story.testimonial, image: mayankRes.docs[0].id };
    }
  }

  // Ensure metrics are correct
  updates.metrics = [
    { value: '291%', label: 'Organic Traffic Growth' },
    { value: '+50%', label: 'Increase in Sign-ups' },
    { value: '34.3%', label: 'Keyword Rankings' },
    { value: '+49%', label: 'Cart Conversion Rate' }
  ];

  await payload.update({
    collection: 'success-stories',
    id: story.id,
    data: updates
  });

  console.log("Updated upgrad-abroad success story data.");
  process.exit(0);
}
run();
