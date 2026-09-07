import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function seedMissingFields() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'success-stories',
      limit: 100,
    });
    
    console.log(`Found ${result.docs.length} success stories`);

    // We can use the images we seeded previously.
    // Let's grab a few images to reuse.
    const mediaRes = await payload.find({
      collection: 'media',
      limit: 20,
    });
    const mediaIds = mediaRes.docs.map(m => m.id);

    if (mediaIds.length === 0) {
      console.log('No media found, skipping visual fields.');
    }

    let updated = 0;
    for (const story of result.docs) {
      // Check if it's lacking metrics or solution blocks
      let needsUpdate = false;
      const data: any = {};

      if (!story.metrics || story.metrics.length === 0) {
        data.metrics = [
          { value: '300%', label: 'Increase in organic traffic' },
          { value: '2.5x', label: 'Higher engagement rate' },
          { value: '45%', label: 'Reduction in bounce rate' },
          { value: 'Top 3', label: 'Ranking on targeted keywords' },
        ];
        needsUpdate = true;
      }

      if (!story.summaryBullets || story.summaryBullets.length === 0) {
        data.summaryHeading = 'SUMMARY';
        data.summaryBullets = [
          { point: 'Redesigned the entire content architecture to improve user journey.' },
          { point: 'Implemented a high-volume, high-quality blog publication strategy.' },
          { point: 'Optimized technical SEO elements to ensure faster indexing.' }
        ];
        needsUpdate = true;
      }

      if (!story.strategyHeading) {
        data.strategyEyebrow = 'STRATEGY';
        data.strategyHeading = 'Turning Strategy Into Digital Experiences';
        data.strategyDescription = 'We began by mapping out the entire user journey, identifying key drop-off points, and designing a content ecosystem that natively solves user problems while guiding them toward conversion.';
        if (mediaIds.length > 0) {
          data.strategyVisual = mediaIds[Math.floor(Math.random() * mediaIds.length)];
        }
        needsUpdate = true;
      }

      if (!story.problemHeading) {
        data.problemHeading = 'Digital Problem';
        data.problemDescription = 'Despite having a great product, the client was struggling to gain visibility in a highly competitive market. Their legacy content was scattered and lacked a cohesive narrative.';
        if (mediaIds.length > 0) {
          data.beforeImage = mediaIds[Math.floor(Math.random() * mediaIds.length)];
          data.afterImage = mediaIds[Math.floor(Math.random() * mediaIds.length)];
        }
        needsUpdate = true;
      }

      if (!story.impactHeading) {
        data.impactHeading = 'Impact Achieved';
        data.impactDescription = 'The strategic overhaul resulted in a massive influx of high-intent traffic. Our content engine became the primary driver of qualified leads, fundamentally shifting the company\'s growth trajectory.';
        if (mediaIds.length > 0) {
          data.impactVisual = mediaIds[Math.floor(Math.random() * mediaIds.length)];
        }
        needsUpdate = true;
      }

      if (!story.solutionBlocks || story.solutionBlocks.length === 0) {
        data.solutionBlocks = [
          {
            heading: 'Comprehensive Content Audit',
            bodyCopy: 'We analyzed over 500 existing pages, consolidating redundant content and updating outdated information to immediately recover lost search equity.',
            image: mediaIds.length > 0 ? mediaIds[Math.floor(Math.random() * mediaIds.length)] : undefined,
          },
          {
            heading: 'High-Velocity Publication',
            bodyCopy: 'We scaled content production to 20 long-form articles per month, strictly adhering to editorial guidelines and advanced SEO optimization techniques.',
            image: mediaIds.length > 0 ? mediaIds[Math.floor(Math.random() * mediaIds.length)] : undefined,
          }
        ];
        needsUpdate = true;
      }

      if (!story.clientDescription) {
        data.clientDescription = 'An industry-leading enterprise focused on delivering innovative solutions to complex problems. They partnered with WrittenlyHub to reinvent their digital presence.';
        if (mediaIds.length > 0) {
          data.clientVisual = mediaIds[Math.floor(Math.random() * mediaIds.length)];
        }
        needsUpdate = true;
      }

      if (needsUpdate) {
        await payload.update({
          collection: 'success-stories',
          id: story.id,
          data,
        });
        updated++;
      }
    }
    
    console.log(`Updated ${updated} success stories with dummy data.`);
    process.exit(0);
  } catch (e) {
    console.error("Payload Error:", e);
    process.exit(1);
  }
}

seedMissingFields();
