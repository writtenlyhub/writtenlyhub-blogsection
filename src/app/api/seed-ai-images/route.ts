import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config });
    
    const mediaIds = [];
    const publicMediaDir = path.join(process.cwd(), 'public', 'media');
    const images = ['ai_generated_feature_0.png', 'ai_generated_feature_1.png', 'ai_generated_feature_2.png'];

    for (let i = 0; i < images.length; i++) {
      const fileName = images[i];
      const filePath = path.join(publicMediaDir, fileName);
      
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        const stat = fs.statSync(filePath);
        
        // Create media in the database
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: 'Premium Abstract Design Visualization',
          },
          file: {
            data: fileData,
            mimetype: 'image/png',
            name: fileName,
            size: stat.size,
          }
        });
        mediaIds.push(media.id);
      }
    }

    if (mediaIds.length === 0) {
      return NextResponse.json({ error: 'No AI images found in public/media to seed.' }, { status: 400 });
    }

    let updatedCount = 0;

    // Update Blogs
    const blogs = await payload.find({ collection: 'blogs', limit: 100 });
    let index = 0;
    for (const blog of blogs.docs) {
      const mediaId = mediaIds[index % mediaIds.length];
      await payload.update({
        collection: 'blogs',
        id: blog.id,
        data: { featuredImage: mediaId }
      });
      index++;
      updatedCount++;
    }

    // Update Success Stories
    const stories = await payload.find({ collection: 'success-stories', limit: 100 });
    for (const story of stories.docs) {
      const mediaId = mediaIds[index % mediaIds.length];
      await payload.update({
        collection: 'success-stories',
        id: story.id,
        data: { featuredImage: mediaId }
      });
      index++;
      updatedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${mediaIds.length} images and updated ${updatedCount} articles!`
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
