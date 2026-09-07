import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function run() {
  const p = await getPayload({config});
  const res = await p.find({collection: 'success-stories', where: { slug: { equals: 'upgrad-abroad' }}});
  console.log(JSON.stringify(res.docs[0], null, 2));
  process.exit(0);
}
run();
