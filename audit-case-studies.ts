import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function audit() {
  const payload = await getPayload({ config });
  
  // 1. Fetch all Payload Success Stories
  const payloadStories = await payload.find({
    collection: 'success-stories',
    limit: 1000,
  });

  // 2. Fetch Export JSON
  let legacyData = [];
  const exportPath = path.resolve('..', 'backupfile', 'export.json');
  if (fs.existsSync(exportPath)) {
    const rawData = fs.readFileSync(exportPath, 'utf8');
    const parsed = JSON.parse(rawData);
    // Usually these exports have a 'posts' array or similar
    if (parsed.posts) {
        legacyData = parsed.posts;
    } else if (Array.isArray(parsed)) {
        legacyData = parsed;
    }
  }

  // Filter legacy data for case studies if possible (check category or tags)
  const legacyCaseStudies = legacyData.filter(post => 
    post.category === 'Case Studies' || 
    post.category === 'Case Study' || 
    post.category === 'Success Stories' ||
    post.tags?.includes('Case Study') ||
    post.slug?.includes('case-study') ||
    post.slug?.includes('success-story')
  );

  const report = {
    payloadStories: payloadStories.docs.map(doc => ({
      title: doc.title,
      clientName: doc.clientName,
      slug: doc.slug,
      featuredImage: doc.featuredImage ? 'Yes' : 'No',
      contentAvailable: doc.shortDescription ? 'Yes' : 'No',
    })),
    legacyStories: legacyCaseStudies.map(post => ({
      title: post.title,
      slug: post.slug,
      category: post.category,
      featuredImage: post.image ? 'Yes' : 'No',
      contentAvailable: post.content ? 'Yes' : 'No',
    }))
  };

  fs.writeFileSync('audit-results.json', JSON.stringify(report, null, 2));
  console.log('Audit complete.');
  process.exit(0);
}

audit().catch(console.error);
