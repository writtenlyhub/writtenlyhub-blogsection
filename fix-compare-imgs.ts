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

  const img1Res = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_1' }}});
  const img2Res = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_2' }}});

  const updates: any = {};
  if (img1Res.docs.length > 0) updates.beforeImage = img1Res.docs[0].id;
  if (img2Res.docs.length > 0) updates.afterImage = img2Res.docs[0].id;

  if (Object.keys(updates).length > 0) {
    await payload.update({
      collection: 'success-stories',
      id: story.id,
      data: updates
    });
    console.log("Updated compare images!");
  } else {
    console.log("Could not find replacement images.");
  }

  process.exit(0);
}
run();
