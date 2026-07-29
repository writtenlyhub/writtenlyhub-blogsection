const { Client } = require('pg');
require('dotenv').config();

function extractText(node) {
  let text = '';
  if (node.type === 'text' && node.text) {
    text += node.text + ' ';
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractText(child);
    }
  }
  return text;
}

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to DB');

    try {
      await client.query('DROP INDEX IF EXISTS "blogs_search_document_idx"');
      await client.query('DROP INDEX IF EXISTS "_blogs_v_version_version_search_document_idx"');
      console.log('Dropped btree indexes for searchDocument');
    } catch (e) {
      console.log('Error dropping index', e);
    }

    // 1. Fetch categories
    const catRes = await client.query('SELECT id, name FROM categories');
    const categories = {};
    for (const c of catRes.rows) {
      categories[c.id] = c.name;
    }

    // 2. Fetch users
    const userRes = await client.query('SELECT id, name FROM users');
    const users = {};
    for (const u of userRes.rows) {
      users[u.id] = u.name;
    }

    // 3. Fetch blogs
    const blogRes = await client.query('SELECT id, title, excerpt, category_id, author_id, content FROM blogs');
    console.log(`Found ${blogRes.rows.length} blogs to backfill.`);

    let count = 0;
    for (const blog of blogRes.rows) {
      const title = blog.title || '';
      const excerpt = blog.excerpt || '';
      const authorName = users[blog.author_id] || '';
      const categoryName = categories[blog.category_id] || '';
      
      let plainText = '';
      if (blog.content && blog.content.root) {
        plainText = extractText(blog.content.root);
      }

      const rawSearchString = `${title} ${excerpt} ${authorName} ${categoryName} ${plainText}`;
      const searchDocument = rawSearchString
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, ' ')
        .trim();

      await client.query('UPDATE blogs SET search_document = $1 WHERE id = $2', [searchDocument, blog.id]);
      count++;
      console.log(`Updated ${count}: ${title}`);
    }

    console.log('Backfill complete!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
