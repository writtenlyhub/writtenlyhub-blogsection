import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function fixTitles() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'success-stories',
    limit: 100,
  });

  console.log(`Found ${result.docs.length} stories. Updating titles...`);
  
  for (let i = 0; i < result.docs.length; i++) {
    const story = result.docs[i];
    
    // A long title that will naturally wrap to 3 lines
    const longTitle = `How we helped ${story.clientName || 'Client ' + (i+1)} achieve 300% growth in organic traffic and skyrocket their enterprise revenue through a comprehensive content strategy and digital authority building execution.`;
    
    await payload.update({
      collection: 'success-stories',
      id: story.id,
      data: {
        title: longTitle,
      }
    });
    console.log(`Updated story ${story.id} with 3-liner title`);
  }

  console.log('Finished updating titles.');
  process.exit(0);
}

fixTitles().catch(console.error);
