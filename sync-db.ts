import { getPayload } from 'payload';
import configPromise from './src/payload.config';
import 'dotenv/config';

async function sync() {
  console.log('Forcing DB push...');
  const config = await configPromise;
  
  if (config.db) {
    // Override the push setting dynamically
    // The typescript definitions for db adapter might be read-only but we can force it
    Object.assign(config.db, { push: true });
  }

  await getPayload({
    config,
  });

  console.log('DB synced successfully!');
  process.exit(0);
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
