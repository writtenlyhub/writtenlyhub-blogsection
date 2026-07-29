import payload from 'payload';
import configPromise from '../../payload.config';
import { seed25Blogs } from './seed-25';

const run = async () => {
  await payload.init({
    config: configPromise,
  });

  await seed25Blogs(payload);
  console.log('Seed complete, exiting...');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
