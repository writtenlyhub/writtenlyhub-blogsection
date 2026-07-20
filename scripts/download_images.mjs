import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop', filename: 'future-of-ai-content-strategy.webp' }, // AI & Tech, code/workspace
  { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', filename: 'mastering-semantic-search-2024.webp' }, // SEO, analytics dashboard
  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop', filename: 'measuring-content-roi.webp' }, // Content, team collaborating
  { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop', filename: 'building-resilient-editorial-calendar.webp' }, // Strategy, planning/calendar
  { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop', filename: 'maintaining-consistency-across-channels.webp' }, // Brand, cohesive business meeting
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop', filename: 'prompt-engineering-b2b-content.webp' }, // AI B2B, modern workspace
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop', filename: 'impact-of-sge-organic-traffic.webp' }, // SEO, laptop with graphs
  { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop', filename: 'automating-content-workflows.webp' }, // AI, clean desk with laptop and notebooks
  { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop', filename: 'evaluating-llms-marketing.webp' }, // AI, professional evaluating on screen
  { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop', filename: 'technical-seo-audit-2024.webp' }, // SEO, data on screens
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop', filename: 'build-demand-generation-engine.webp' }, // Content, presentation/strategy
  { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop', filename: 'content-syndication-best-practices.webp' }, // Content, modern office laptops
];

const DIR = path.resolve('public/images/blog');

async function run() {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR, { recursive: true });
  }

  for (const img of IMAGES) {
    const dest = path.join(DIR, img.filename);
    if (fs.existsSync(dest)) {
      console.log(`Skipping \${img.filename} - already exists`);
      continue;
    }
    
    console.log(`Downloading \${img.filename}...`);
    try {
      const res = await fetch(img.url);
      if (!res.ok) throw new Error(`HTTP \${res.status} \${res.statusText}`);
      
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      await sharp(buffer)
        .resize(1600, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(dest);
      console.log(`Saved \${img.filename}`);
    } catch (e) {
      console.error(`Error with \${img.filename}: \${e.message}`);
    }
  }
}

run().catch(console.error);
