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

  const beforeRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_1' }}});
  const afterRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_2' }}});

  const updates: any = {};
  
  if (beforeRes.docs.length > 0) updates.beforeImage = beforeRes.docs[0].id;
  if (afterRes.docs.length > 0) updates.afterImage = afterRes.docs[0].id;

  updates.problemPoints = [
    { heading: 'Low Organic Visibility', description: 'Poor rankings for critical, high-intent keywords in the study abroad sector.' },
    { heading: 'Inconsistent Content', description: 'Lack of engaging, SEO-friendly content that addressed real student concerns.' },
    { heading: 'Conversion Bottlenecks', description: 'Existing organic traffic was not translating into meaningful sign-ups or leads.' }
  ];

  await payload.update({
    collection: 'success-stories',
    id: story.id,
    data: updates
  });

  console.log("Fixed upgrad-abroad success story problem section data!");
  console.log("BeforeImage set to:", updates.beforeImage);
  console.log("AfterImage set to:", updates.afterImage);
  process.exit(0);
}
run();
