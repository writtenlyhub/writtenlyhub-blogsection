import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\iamvr\\.gemini\\antigravity-ide\\brain\\d4daecae-79f2-4d77-86b8-db5aab70a369';
const imageFiles = [
  'case_study_1_1788518999402.png',
  'case_study_2_1788519017104.png',
  'case_study_3_1788519030161.png',
  'case_study_4_1788519052689.png',
  'case_study_5_1788519068783.png',
  'case_study_6_1788519315563.png',
  'case_study_7_1788519343041.png',
  'case_study_8_1788519359535.png',
  'case_study_9_1788519409410.png'
];

async function run() {
  console.log('Uploading premium case study images...');
  const payload = await getPayload({ config });

  const mediaIds = [];

  for (const imgName of imageFiles) {
    const fullPath = path.join(artifactsDir, imgName);
    if (fs.existsSync(fullPath)) {
      console.log(`Uploading ${imgName}...`);
      const fileData = fs.readFileSync(fullPath);
      const stat = fs.statSync(fullPath);
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: 'Premium Editorial Case Study Visualization',
        },
        file: {
          data: fileData,
          mimetype: 'image/png',
          name: imgName,
          size: stat.size,
        }
      });
      mediaIds.push(media.id);
    } else {
      console.error(`File missing: ${fullPath}`);
    }
  }

  if (mediaIds.length === 0) {
    console.error('No media uploaded. Exiting.');
    process.exit(1);
  }

  console.log('Fetching success stories...');
  const storiesRes = await payload.find({
    collection: 'success-stories',
    limit: 100,
  });

  console.log(`Updating ${storiesRes.docs.length} stories with new images...`);
  
  let mediaIndex = 0;
  for (const story of storiesRes.docs) {
    const mediaId = mediaIds[mediaIndex % mediaIds.length];
    
    await payload.update({
      collection: 'success-stories',
      id: story.id,
      data: {
        featuredImage: mediaId,
        clientLogo: mediaId,
      }
    });
    
    mediaIndex++;
  }

  console.log('Finished updating imagery for all cards!');
  process.exit(0);
}

run();
