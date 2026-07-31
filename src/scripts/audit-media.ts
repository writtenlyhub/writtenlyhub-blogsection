import { getPayload } from 'payload';
import configPromise from '../payload.config';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

async function auditMedia() {
  console.log('Starting Media Audit...\n');
  
  const payload = await getPayload({ config: configPromise });
  const media = await payload.find({ 
    collection: 'media', 
    limit: 5000, 
    pagination: false 
  });
  
  console.log(`Found ${media.docs.length} total media records in database.`);
  
  const orphaned: typeof media.docs = [];
  const invalidPaths = [];

  for (const item of media.docs) {
    if (!item.filename) {
      invalidPaths.push(item);
      continue;
    }
    
    // Payload staticDir is 'public/media'
    const filePath = path.join(process.cwd(), 'public', 'media', item.filename);
    
    if (!fs.existsSync(filePath)) {
      orphaned.push(item);
    }
  }
  
  console.log('\n--- ORPHANED MEDIA REPORT ---');
  if (orphaned.length === 0 && invalidPaths.length === 0) {
    console.log('✅ No orphaned media records found! Database perfectly matches filesystem.');
  } else {
    if (orphaned.length > 0) {
      console.log(`\n❌ Found ${orphaned.length} missing files (Database record exists, but physical file is missing):`);
      orphaned.forEach(doc => {
        console.log(`- ID: ${doc.id} | Filename: ${doc.filename} | Alt: ${doc.alt}`);
      });
    }
    
    if (invalidPaths.length > 0) {
      console.log(`\n❌ Found ${invalidPaths.length} invalid records (No filename specified):`);
      invalidPaths.forEach(doc => {
        console.log(`- ID: ${doc.id} | Alt: ${doc.alt}`);
      });
    }
    
    console.log('\n⚠️ DO NOT delete these records automatically. Investigate why they are missing first.');
  }
  
  process.exit(0);
}

auditMedia().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
