import http from 'http';
import robots from '../src/app/robots';
import sitemap from '../src/app/sitemap';
import { getBlogInvalidationTags } from '../src/collections/Blogs';
import { sendRevalidationWebhook } from '../src/lib/utils/revalidate';
import { buildCanonicalUrl } from '../src/lib/seo/buildCanonical';
import { buildMetadata } from '../src/lib/seo/buildMetadata';

async function runTests() {
  console.log('====================================================');
  console.log('   WRITTENLYHUB: NEWS SEO AUDIT FIXES TEST SUITE    ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(title: string, condition: boolean, detail: string = '') {
    if (condition) {
      console.log(`[PASS] ${title}`);
      if (detail) console.log(`       -> ${detail}`);
      passed++;
    } else {
      console.error(`[FAIL] ${title}`);
      if (detail) console.error(`       -> ${detail}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // TEST GROUP 1: Robots Hostname Consistency (Fix 1)
  // -------------------------------------------------------------
  console.log('--- TEST GROUP 1: Robots Hostname Consistency (Fix 1) ---');
  
  // Test 1.1: Default fallback when NEXT_PUBLIC_SITE_URL is undefined
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const defaultRobots = robots();
  assert(
    'Robots fallback sitemap uses https://www.writtenlyhub.com when env is unset',
    defaultRobots.sitemap === 'https://www.writtenlyhub.com/sitemap.xml',
    `Got: ${defaultRobots.sitemap}`
  );

  // Test 1.2: Custom NEXT_PUBLIC_SITE_URL override (e.g., localhost or staging)
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000/';
  const customRobots = robots();
  assert(
    'Robots respects NEXT_PUBLIC_SITE_URL and trims trailing slashes',
    customRobots.sitemap === 'http://localhost:3000/sitemap.xml',
    `Got: ${customRobots.sitemap}`
  );

  // Test 1.3: Allow/Disallow rule preservation
  const rules = defaultRobots.rules as any;
  const mainRule = Array.isArray(rules) ? rules[0] : rules;
  assert('Robots allows /news and /news/*', 
    mainRule.allow?.includes('/news') && mainRule.allow?.includes('/news/*'),
    `Allow: ${JSON.stringify(mainRule.allow)}`
  );
  assert('Robots allows /blog and /blog/*', 
    mainRule.allow?.includes('/blog') && mainRule.allow?.includes('/blog/*'),
    `Allow: ${JSON.stringify(mainRule.allow)}`
  );
  assert('Robots disallows admin and internal api routes',
    mainRule.disallow?.includes('/admin') && mainRule.disallow?.includes('/api/*'),
    `Disallow: ${JSON.stringify(mainRule.disallow)}`
  );

  // Restore env
  if (originalEnv !== undefined) {
    process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
  } else {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  }

  // -------------------------------------------------------------
  // TEST GROUP 2: Content-Specific Cache Invalidation (Fix 2)
  // -------------------------------------------------------------
  console.log('\n--- TEST GROUP 2: Content-Specific Cache Invalidation (Fix 2) ---');

  // Test 2.1: News publication tags
  const newsPubTags = getBlogInvalidationTags({ slug: 'ai-search-updates', contentType: 'news' });
  assert(
    'News publication tags contain "blogs" and "news-<slug>"',
    newsPubTags.includes('blogs') && newsPubTags.includes('news-ai-search-updates') && !newsPubTags.some(t => t.startsWith('blog-')),
    `Tags: ${JSON.stringify(newsPubTags)}`
  );

  // Test 2.2: Blog publication tags
  const blogPubTags = getBlogInvalidationTags({ slug: 'seo-writing-guide', contentType: 'blog' });
  assert(
    'Blog publication tags contain "blogs" and "blog-<slug>"',
    blogPubTags.includes('blogs') && blogPubTags.includes('blog-seo-writing-guide') && !blogPubTags.some(t => t.startsWith('news-')),
    `Tags: ${JSON.stringify(blogPubTags)}`
  );

  // Test 2.3: News slug change invalidation
  const newsSlugChangeTags = getBlogInvalidationTags(
    { slug: 'new-ai-policy', contentType: 'news' },
    { slug: 'old-ai-policy', contentType: 'news' }
  );
  assert(
    'News slug change invalidates both new slug and old slug with news- prefix',
    newsSlugChangeTags.includes('blogs') &&
    newsSlugChangeTags.includes('news-new-ai-policy') &&
    newsSlugChangeTags.includes('news-old-ai-policy'),
    `Tags: ${JSON.stringify(newsSlugChangeTags)}`
  );

  // Test 2.4: Blog slug change invalidation
  const blogSlugChangeTags = getBlogInvalidationTags(
    { slug: 'new-content-strategy', contentType: 'blog' },
    { slug: 'old-content-strategy', contentType: 'blog' }
  );
  assert(
    'Blog slug change invalidates both new slug and old slug with blog- prefix',
    blogSlugChangeTags.includes('blogs') &&
    blogSlugChangeTags.includes('blog-new-content-strategy') &&
    blogSlugChangeTags.includes('blog-old-content-strategy'),
    `Tags: ${JSON.stringify(blogSlugChangeTags)}`
  );

  // Test 2.5: Content type migration (blog -> news)
  const migrationTags = getBlogInvalidationTags(
    { slug: 'shared-article', contentType: 'news' },
    { slug: 'shared-article', contentType: 'blog' }
  );
  assert(
    'Content type change invalidates both prefixes for the slug',
    migrationTags.includes('blogs') &&
    migrationTags.includes('news-shared-article') &&
    migrationTags.includes('blog-shared-article'),
    `Tags: ${JSON.stringify(migrationTags)}`
  );

  // -------------------------------------------------------------
  // TEST GROUP 3: Authenticated Revalidation Fallback (Fix 3)
  // -------------------------------------------------------------
  console.log('\n--- TEST GROUP 3: Authenticated Revalidation Fallback (Fix 3) ---');

  // Setup an in-memory HTTP mock server to test webhook interactions
  let lastAuthHeader: string | undefined;
  let lastBody: any;
  const mockServer = http.createServer((req, res) => {
    lastAuthHeader = req.headers['authorization'];
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        lastBody = JSON.parse(body);
      } catch {
        lastBody = null;
      }
      if (lastAuthHeader === 'Bearer valid-secret-123') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ revalidated: true, now: Date.now() }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
      }
    });
  });

  await new Promise<void>(resolve => mockServer.listen(0, '127.0.0.1', () => resolve()));
  const mockPort = (mockServer.address() as any).port;
  const mockBaseUrl = `http://127.0.0.1:${mockPort}`;

  try {
    // Test 3.1: Authenticated success
    const successRes = await sendRevalidationWebhook(['blogs', 'news-test'], mockBaseUrl, 'valid-secret-123');
    assert('Webhook succeeds when valid Bearer token is provided', 
      successRes.ok === true && successRes.status === 200 && successRes.revalidated === true,
      `Result: ${JSON.stringify(successRes)}`
    );
    assert('Authorization header passed Bearer token securely',
      lastAuthHeader === 'Bearer valid-secret-123',
      `Header: ${lastAuthHeader}`
    );
    assert('Webhook payload contains exact tags',
      JSON.stringify(lastBody?.tags) === JSON.stringify(['blogs', 'news-test']),
      `Body: ${JSON.stringify(lastBody)}`
    );

    // Test 3.2: Unauthorized failure
    const unauthorizedRes = await sendRevalidationWebhook(['blogs'], mockBaseUrl, 'invalid-secret');
    assert('Webhook fails safely with 401 when invalid secret is provided',
      unauthorizedRes.ok === false && unauthorizedRes.status === 401 && unauthorizedRes.error === 'Unauthorized',
      `Result: ${JSON.stringify(unauthorizedRes)}`
    );

    // Test 3.3: Missing secret behavior
    const missingSecretRes = await sendRevalidationWebhook(['blogs'], mockBaseUrl, '');
    assert('Webhook aborts safely with error when secret is empty/missing without making HTTP call',
      missingSecretRes.ok === false && missingSecretRes.error === 'Missing PAYLOAD_SECRET',
      `Result: ${JSON.stringify(missingSecretRes)}`
    );

    // Test 3.4: Network failure safety
    const deadUrlRes = await sendRevalidationWebhook(['blogs'], 'http://127.0.0.1:1', 'valid-secret-123');
    assert('Webhook handles unreachable network without crashing',
      deadUrlRes.ok === false && Boolean(deadUrlRes.error),
      `Result: ${JSON.stringify(deadUrlRes)}`
    );
  } finally {
    await new Promise<void>(resolve => mockServer.close(() => resolve()));
  }

  // -------------------------------------------------------------
  // TEST GROUP 4: Canonical Consistency & SEO Parity
  // -------------------------------------------------------------
  console.log('\n--- TEST GROUP 4: Canonical Consistency & SEO Parity ---');

  // Test 4.1: buildCanonicalUrl default hostname
  const defaultNewsCanonical = buildCanonicalUrl(null, 'claude-fake-sources', '/news/');
  assert('buildCanonicalUrl defaults to https://www.writtenlyhub.com',
    defaultNewsCanonical === 'https://www.writtenlyhub.com/news/claude-fake-sources',
    `Got: ${defaultNewsCanonical}`
  );

  // Test 4.2: buildCanonicalUrl handles pathPrefix normalization
  const norm1 = buildCanonicalUrl(null, 'test', 'news');
  const norm2 = buildCanonicalUrl(null, 'test', '/news/');
  assert('buildCanonicalUrl normalizes pathPrefix slashes consistently',
    norm1 === norm2 && norm1 === 'https://www.writtenlyhub.com/news/test',
    `norm1: ${norm1} | norm2: ${norm2}`
  );

  // Test 4.3: buildMetadata canonical matches buildCanonicalUrl
  const meta = buildMetadata({
    post: { title: 'Test Article', slug: 'claude-fake-sources', _status: 'published' },
    siteSettings: {},
    slug: 'claude-fake-sources',
    pathPrefix: '/news/',
  });
  const pageCanonical = (meta.alternates as any)?.canonical;
  assert('Article page metadata canonical matches buildCanonicalUrl output',
    pageCanonical === defaultNewsCanonical,
    `pageCanonical: ${pageCanonical} | defaultNewsCanonical: ${defaultNewsCanonical}`
  );

  // Test 4.4: External canonical override preserved
  const overrideRes = buildCanonicalUrl('https://medium.com/@writtenlyhub/external-article', 'slug', '/news/');
  assert('Valid external canonical URL preserved verbatim',
    overrideRes === 'https://medium.com/@writtenlyhub/external-article',
    `Got: ${overrideRes}`
  );

  // Test 4.5: Malformed canonical override fallback
  const malformedRes = buildCanonicalUrl('not-a-valid-url', 'slug', '/news/');
  assert('Malformed canonical override safely falls back to canonical URL',
    malformedRes === 'https://www.writtenlyhub.com/news/slug',
    `Got: ${malformedRes}`
  );

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
