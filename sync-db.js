import { getPayload } from 'payload'
import config from './src/payload.config.js'

async function sync() {
  console.log('Forcing DB push...');
  // Force push to be true
  const modifiedConfig = { ...await config };
  if (modifiedConfig.db) {
    modifiedConfig.db.push = true;
  }
  
  await getPayload({
    config: modifiedConfig,
  });
  console.log('DB synced!');
  process.exit(0);
}

sync().catch(console.error);
