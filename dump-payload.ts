import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function run() {
  const payload = await getPayload({config});
  const story = await payload.find({collection: 'success-stories', where: {slug: {equals: 'upgrad-abroad'}}, depth: 2});
  console.log(JSON.stringify(story.docs[0], null, 2));
  process.exit(0);
}
run();
