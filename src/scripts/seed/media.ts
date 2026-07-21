import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Payload } from 'payload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export async function seedMedia(payload: Payload) {
  payload.logger.info('— Seeding Media...');

  const mediaFiles = [
    { filename: 'avatar-1.svg', filepath: path.join(dirname, 'assets', 'avatar-1.svg') },
    { filename: 'avatar-2.svg', filepath: path.join(dirname, 'assets', 'avatar-2.svg') },
    { filename: 'cover-1.svg', filepath: path.join(dirname, 'assets', 'cover-1.svg') },
  ];

  const results: Record<string, string> = {};

  for (const file of mediaFiles) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: file.filename,
        },
      },
    });

    if (existingMedia.docs.length > 0) {
      results[file.filename] = existingMedia.docs[0].id;
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(file.filepath);
      const fileSize = fs.statSync(file.filepath).size;

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `Demo Media ${file.filename}`,
        },
        file: {
          data: fileBuffer,
          name: file.filename,
          mimetype: 'image/svg+xml',
          size: fileSize,
        },
      });

      results[file.filename] = media.id;
    } catch (e) {
      payload.logger.error(`Failed to upload ${file.filename}: ${e}`);
    }
  }

  payload.logger.info(`✓ Media seeded (${Object.keys(results).length} items)`);
  return results;
}
