import dotenv from 'dotenv';
dotenv.config();

import { getPayload } from 'payload';
import config from '../../src/payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  console.log('--- 1. Creating a draft post ---');
  // 1. Get first user and category
  const users = await payload.find({ collection: 'users', limit: 1 });
  const categories = await payload.find({ collection: 'categories', limit: 1 });
  const media = await payload.find({ collection: 'media', limit: 1 });
  
  const draftPost = await payload.create({
    collection: 'blogs',
    draft: true,
    data: {
      title: 'E2E Testing Draft ' + Date.now(),
      slug: 'e2e-testing-draft-' + Date.now(),
      excerpt: 'This is an e2e draft post.',
      content: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ mode: 'normal', text: 'Draft content!', type: 'text', version: 1 }] }] } },
      author: users.docs[0].id,
      category: categories.docs[0].id,
      featuredImage: media.docs[0].id,
      _status: 'draft',
      publishedAt: new Date().toISOString(),
    },
  });
  const slug = draftPost.slug;
  console.log(`Created draft slug: ${slug}`);

  // Need a preview secret
  const secret = process.env.PREVIEW_SECRET || '';
  if (!secret) throw new Error('PREVIEW_SECRET missing');

  console.log('\n--- 2. Fetching Preview URL ---');
  const previewUrl = `http://localhost:3000/api/draft?secret=${secret}&slug=${slug}`;
  const resPreview = await fetch(previewUrl, { redirect: 'manual' });
  
  if (resPreview.status !== 307 && resPreview.status !== 302) {
    throw new Error(`Expected redirect from /api/draft, got ${resPreview.status}`);
  }
  
  const cookies = resPreview.headers.get('set-cookie');
  if (!cookies || !cookies.includes('__prerender_bypass')) {
    throw new Error('Did not receive draft mode cookies');
  }
  console.log('Draft cookies received successfully!');

  console.log('\n--- 3. Verifying draft is visible with cookies ---');
  // fetch /blog/[slug] with cookies
  const draftPageRes = await fetch(`http://localhost:3000/blog/${slug}`, {
    headers: { cookie: cookies }
  });
  if (draftPageRes.status !== 200) {
    throw new Error(`Draft page returned ${draftPageRes.status} instead of 200`);
  }
  const draftHtml = await draftPageRes.text();
  if (!draftHtml.includes('Draft content!')) {
    throw new Error('Draft page HTML did not contain expected content');
  }
  console.log('Draft successfully rendered with preview cookies!');

  console.log('\n--- 4. Verifying draft is NOT visible on live page ---');
  const livePageRes = await fetch(`http://localhost:3000/blog/${slug}`);
  if (livePageRes.status !== 404) {
    const html = await livePageRes.text();
    if (!html.includes('Page not found') && html.includes('Draft content!')) {
      throw new Error(`Expected 404 for live draft post, got ${livePageRes.status} with draft content.`);
    } else if (html.includes('Page not found') || livePageRes.status === 404) {
      console.log('Live page correctly returned 404 (or rendered not-found) for draft post.');
    } else {
      throw new Error(`Expected 404 for live draft post, got ${livePageRes.status}. HTML preview: ${html.substring(0, 200)}`);
    }
  } else {
    console.log('Live page correctly returned 404 for draft post.');
  }

  console.log('\n--- 5. Publishing the post ---');
  await payload.update({
    collection: 'blogs',
    id: draftPost.id,
    draft: false,
    data: {
      _status: 'published',
      content: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ mode: 'normal', text: 'Published content!', type: 'text', version: 1 }] }] } },
    }
  });
  console.log('Post published.');

  // Wait a moment for webhook to trigger revalidation
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n--- 6. Verifying published changes on live page ---');
  const livePagePublishedRes = await fetch(`http://localhost:3000/blog/${slug}`);
  if (livePagePublishedRes.status !== 200) {
    throw new Error(`Expected 200 for published post, got ${livePagePublishedRes.status}`);
  }
  const liveHtml = await livePagePublishedRes.text();
  if (!liveHtml.includes('Published content!')) {
    throw new Error('Live page did not contain the published content');
  }
  console.log('Published content verified successfully!');
  
  console.log('\nAll E2E checks passed! Draft Mode & Caching are working perfectly.');
}

run().catch(err => {
  console.error('\nE2E Test Failed:', err);
  process.exit(1);
});
