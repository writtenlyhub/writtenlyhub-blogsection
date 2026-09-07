import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';
import fs from 'fs';
import path from 'path';

async function fixLogos() {
  const payload = await getPayload({ config });
  
  const files = [
    { name: 'saas_logo.png', path: 'C:\\\\Users\\\\iamvr\\\\.gemini\\\\antigravity-ide\\\\brain\\\\d4daecae-79f2-4d77-86b8-db5aab70a369\\\\modern_saas_logo_1_1788755821135.png' },
    { name: 'tech_logo.png', path: 'C:\\\\Users\\\\iamvr\\\\.gemini\\\\antigravity-ide\\\\brain\\\\d4daecae-79f2-4d77-86b8-db5aab70a369\\\\tech_startup_logo_2_1788755831543.png' },
    { name: 'health_logo.png', path: 'C:\\\\Users\\\\iamvr\\\\.gemini\\\\antigravity-ide\\\\brain\\\\d4daecae-79f2-4d77-86b8-db5aab70a369\\\\healthtech_logo_3_1788755964794.png' },
    { name: 'fintech_logo.png', path: 'C:\\\\Users\\\\iamvr\\\\.gemini\\\\antigravity-ide\\\\brain\\\\d4daecae-79f2-4d77-86b8-db5aab70a369\\\\fintech_logo_4_1788755982996.png' }
  ];

  const uploadedMedia = [];
  for (const f of files) {
    if (!fs.existsSync(f.path)) {
      console.log('Not found:', f.path);
      continue;
    }
    const media = await payload.create({
      collection: 'media',
      data: { alt: f.name },
      file: {
        data: fs.readFileSync(f.path),
        mimetype: 'image/png',
        name: f.name,
        size: fs.statSync(f.path).size,
      }
    });
    uploadedMedia.push(media.id);
  }

  if (uploadedMedia.length === 0) {
    console.log('No media uploaded');
    process.exit(1);
  }

  const result = await payload.find({
    collection: 'success-stories',
    limit: 100,
  });

  console.log(`Found ${result.docs.length} stories. Updating logos...`);
  
  for (let i = 0; i < result.docs.length; i++) {
    const story = result.docs[i];
    const logoId = uploadedMedia[i % uploadedMedia.length];
    
    await payload.update({
      collection: 'success-stories',
      id: story.id,
      data: {
        clientLogo: logoId,
      }
    });
    console.log(`Updated story ${story.id} with logo ${logoId}`);
  }

  console.log('Finished updating logos.');
  process.exit(0);
}

fixLogos().catch(console.error);
