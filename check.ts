import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function check() {
  const p = await getPayload({ config });
  const res = await p.find({ collection: 'blogs' });
  console.log('TOTAL POSTS:', res.totalDocs);
  
  const pub = await p.find({
    collection: 'blogs',
    where: { _status: { equals: 'published' } }
  });
  console.log('PUBLISHED POSTS:', pub.totalDocs);
  process.exit(0);
}
check();
