import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../src/payload.config';
import fs from 'fs';
import path from 'path';

const imageFiles = [
  'C:\\Users\\iamvr\\.gemini\\antigravity-ide\\brain\\aa065c08-98a7-467d-9337-763441754a7d\\premium_ai_blog_feature_1788968892458.png',
  'C:\\Users\\iamvr\\.gemini\\antigravity-ide\\brain\\aa065c08-98a7-467d-9337-763441754a7d\\premium_ai_news_feature_1788968914663.png',
  'C:\\Users\\iamvr\\.gemini\\antigravity-ide\\brain\\aa065c08-98a7-467d-9337-763441754a7d\\premium_ai_work_feature_1788968939879.png'
];

async function run() {
  console.log('Starting AI image upload...');
  const payload = await getPayload({ config });

  const mediaIds = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const fullPath = imageFiles[i];
    if (fs.existsSync(fullPath)) {
      console.log(`Uploading ${path.basename(fullPath)}...`);
      const fileData = fs.readFileSync(fullPath);
      const stat = fs.statSync(fullPath);
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: 'Premium Abstract Design Visualization',
        },
        file: {
          data: fileData,
          mimetype: 'image/png',
          name: `ai_generated_feature_${i}.png`,
          size: stat.size,
        }
      });
      mediaIds.push(media.id);
      console.log(`Uploaded with ID: ${media.id}`);
    } else {
      console.error(`File missing: ${fullPath}`);
    }
  }

  if (mediaIds.length === 0) {
    console.error('No media uploaded. Exiting.');
    process.exit(1);
  }

  console.log('Fetching all blogs...');
  const blogs = await payload.find({ collection: 'blogs', limit: 100 });
  let index = 0;
  for (const blog of blogs.docs) {
    const mediaId = mediaIds[index % mediaIds.length];
    console.log(`Updating Blog: ${blog.title} with Media ID: ${mediaId}`);
    await payload.update({
      collection: 'blogs',
      id: blog.id,
      data: { featuredImage: mediaId }
    });
    index++;
  }

  console.log('Fetching all success stories...');
  const stories = await payload.find({ collection: 'success-stories', limit: 100 });
  for (const story of stories.docs) {
    const mediaId = mediaIds[index % mediaIds.length];
    console.log(`Updating Success Story: ${story.title} with Media ID: ${mediaId}`);
    await payload.update({
      collection: 'success-stories',
      id: story.id,
      data: { featuredImage: mediaId }
    });
    index++;
  }

  console.log('Finished updating imagery for all cards!');
  process.exit(0);
}

run();
