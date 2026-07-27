const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_jruZV9PL2OkR@ep-square-cell-azvqptv7-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require' });
client.connect()
  .then(() => client.query("UPDATE blogs SET _status = 'published' WHERE id = 19"))
  .then(() => console.log('Updated to published!'))
  .catch(console.error)
  .finally(() => client.end());
