const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000';

async function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runQA() {
  console.log('--- Starting Technical & Frontend SEO QA ---');
  
  // 1. Check Sitemap
  try {
    const sitemap = await fetchUrl('/sitemap.xml');
    console.log(`[Sitemap] Status: ${sitemap.status}`);
    if (sitemap.data.includes('<?xml') && sitemap.data.includes('<urlset')) {
      console.log('✅ Sitemap valid');
    } else {
      console.log('❌ Sitemap invalid');
    }
  } catch (e) { console.log('❌ Sitemap fetch failed', e.message); }

  // 2. Check RSS Feed
  try {
    const feed = await fetchUrl('/feed.xml');
    console.log(`[RSS Feed] Status: ${feed.status}`);
    if (feed.data.includes('<?xml') && feed.data.includes('<rss')) {
      console.log('✅ RSS Feed valid');
    } else {
      console.log('❌ RSS Feed invalid');
    }
  } catch (e) { console.log('❌ RSS Feed fetch failed', e.message); }

  // 3. Check Robots.txt
  try {
    const robots = await fetchUrl('/robots.txt');
    console.log(`[Robots.txt] Status: ${robots.status}`);
    if (robots.data.includes('User-Agent:') || robots.data.includes('User-agent:')) {
      console.log('✅ Robots.txt valid');
    } else {
      console.log('❌ Robots.txt invalid');
    }
  } catch (e) { console.log('❌ Robots.txt fetch failed', e.message); }

  // 4. Check Frontend SEO tags on a blog post
  // We need to fetch an actual blog post slug. Let's fetch /blog first to find a slug.
  try {
    const blogIndex = await fetchUrl('/blog');
    const slugMatch = blogIndex.data.match(/href="\/blog\/([^"]+)"/);
    if (slugMatch && slugMatch[1]) {
      const slug = slugMatch[1];
      console.log(`\nTesting Frontend SEO on /blog/${slug} ...`);
      const post = await fetchUrl(`/blog/${slug}`);
      const html = post.data;

      const checks = {
        title: /<title[^>]*>([^<]+)<\/title>/.test(html),
        metaDescription: /<meta[^>]*name="description"[^>]*>/.test(html),
        canonical: /<link[^>]*rel="canonical"[^>]*>/.test(html),
        ogTitle: /<meta[^>]*property="og:title"[^>]*>/.test(html),
        ogImage: /<meta[^>]*property="og:image"[^>]*>/.test(html),
        twitterCard: /<meta[^>]*name="twitter:card"[^>]*>/.test(html),
        jsonLd: /<script[^>]*type="application\/ld\+json"[^>]*>/.test(html),
        robots: /<meta[^>]*name="robots"[^>]*>/.test(html),
      };

      for (const [tag, passed] of Object.entries(checks)) {
        console.log(`${passed ? '✅' : '❌'} ${tag}`);
      }
    } else {
      console.log('❌ Could not find a blog post slug on /blog index.');
    }
  } catch (e) { console.log('❌ Frontend SEO test failed', e.message); }

  console.log('--- QA Complete ---');
}

runQA();
