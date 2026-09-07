import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config';

async function test() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'success-stories',
    });
    console.log("Success:", result.docs.length);
  } catch (e) {
    console.error("Payload Error:", e);
  }
}

test();
