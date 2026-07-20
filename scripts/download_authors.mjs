import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const AUTHORS = [
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', filename: 'sarah.webp' },
  { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', filename: 'alex.webp' },
  { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', filename: 'marcus.webp' },
  { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop', filename: 'elena.webp' },
  { url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop', filename: 'david.webp' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', filename: 'maria.webp' },
];

const DIR = path.resolve('public/images/authors');

async function run() {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR, { recursive: true });
  }

  for (const img of AUTHORS) {
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
        .resize(800, 800, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(dest);
      console.log(`Saved \${img.filename}`);
    } catch (e) {
      console.error(`Error with \${img.filename}: \${e.message}`);
    }
  }
}

run().catch(console.error);
