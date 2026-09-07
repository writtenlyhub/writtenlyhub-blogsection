import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function run() {
  const payload = await getPayload({config});
  
  // Find the correct case study visuals
  const beforeRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_1' }}});
  const afterRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_2' }}});
  const strategyRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_3' }}});
  const impactRes = await payload.find({collection: 'media', where: { filename: { contains: 'case_study_4' }}});

  const beforeImageId = beforeRes.docs.length > 0 ? beforeRes.docs[0].id : null;
  const afterImageId = afterRes.docs.length > 0 ? afterRes.docs[0].id : null;
  const strategyVisualId = strategyRes.docs.length > 0 ? strategyRes.docs[0].id : null;
  const impactVisualId = impactRes.docs.length > 0 ? impactRes.docs[0].id : null;

  // Get all success stories
  const stories = await payload.find({
    collection: 'success-stories',
    limit: 100,
  });

  console.log(`Fixing ${stories.docs.length} stories...`);

  const problemPoints = [
    { heading: 'Low Organic Visibility', description: 'Poor rankings for critical, high-intent keywords in the sector.' },
    { heading: 'Inconsistent Content', description: 'Lack of engaging, SEO-friendly content that addressed real concerns.' },
    { heading: 'Conversion Bottlenecks', description: 'Existing organic traffic was not translating into meaningful sign-ups or leads.' }
  ];

  for (const story of stories.docs) {
    const updates: any = {};
    let needsUpdate = false;

    // Fix missing problem points
    if (!story.problemPoints || story.problemPoints.length === 0) {
      updates.problemPoints = problemPoints;
      needsUpdate = true;
    }

    // Fix incorrect random beforeImage/afterImage
    if (beforeImageId && story.beforeImage) {
      // Force update to use the proper case study visuals instead of random avatars
      updates.beforeImage = beforeImageId;
      needsUpdate = true;
    }
    if (afterImageId && story.afterImage) {
      updates.afterImage = afterImageId;
      needsUpdate = true;
    }
    
    // Also fix strategy visual
    if (strategyVisualId && !story.strategyVisual) {
       updates.strategyVisual = strategyVisualId;
       needsUpdate = true;
    }

    if (needsUpdate) {
      await payload.update({
        collection: 'success-stories',
        id: story.id,
        data: updates
      });
      console.log(`Updated story: ${story.slug}`);
    }
  }

  console.log("All success stories fixed!");
  process.exit(0);
}
run();
