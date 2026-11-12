import type { Payload } from 'payload';
import { generateRichText } from './lexical';
import { realisticLongFormContent } from './mockContent';

export async function seedNews(
  payload: Payload,
  mediaIds?: Record<string, number>,
  userIds?: Record<string, number>,
  categoryIds?: Record<string, number>,
) {
  payload.logger.info('— Seeding News Articles...');

  // Resolve users if not passed
  let resolvedUserIds = userIds;
  if (!resolvedUserIds || Object.keys(resolvedUserIds).length === 0) {
    const users = await payload.find({ collection: 'users', limit: 10 });
    resolvedUserIds = {};
    for (const u of users.docs) {
      resolvedUserIds[u.email] = u.id;
    }
  }
  const defaultAuthorId = Object.values(resolvedUserIds)[0];

  // Resolve categories if not passed
  let resolvedCategoryIds = categoryIds;
  if (!resolvedCategoryIds || Object.keys(resolvedCategoryIds).length === 0) {
    const cats = await payload.find({ collection: 'categories', limit: 20 });
    resolvedCategoryIds = {};
    for (const c of cats.docs) {
      if (c.slug) resolvedCategoryIds[c.slug] = c.id;
    }
  }

  // Resolve media if not passed
  let defaultMediaId = mediaIds ? Object.values(mediaIds)[0] : undefined;
  if (!defaultMediaId) {
    const media = await payload.find({ collection: 'media', limit: 5 });
    if (media.docs.length > 0) {
      defaultMediaId = media.docs[0].id;
    }
  }

  const newsData = [
    {
      title: 'Anthropic Updates Usage Policy to Ban Seeding Fake Sources for AI Answers',
      slug: 'anthropic-updates-usage-policy-fake-sources',
      excerpt: 'Anthropic announces strict updates to Claude policies prohibiting the artificial seeding of fabricated sources for generative answer engines.',
      categorySlug: 'ai-writing',
      authorEmail: 'sarah.content@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    },
    {
      title: 'India CTV Advertising Projected to Match Linear Television Ads by 2027',
      slug: 'india-ctv-advertising-match-linear-tv-by-2027',
      excerpt: 'Connected TV viewership accelerates across tier-1 and tier-2 markets, driving record programmatic ad spends in APAC regions.',
      categorySlug: 'digital-marketing',
      authorEmail: 'mark.seo@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      title: 'Google AI Mode Expands Web Monitoring to Global Search Queries',
      slug: 'google-ai-mode-expands-web-monitoring',
      excerpt: 'Google introduces real-time web monitoring inside AI Overviews, providing instant notification triggers for critical search intent shifts.',
      categorySlug: 'seo',
      authorEmail: 'mark.seo@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
      title: 'Meta Unveils Muse for Small Business: Direct Instagram and Ad Platform Integration',
      slug: 'meta-unveils-muse-for-small-business',
      excerpt: 'Meta rolls out AI-driven creative automation suite designed to help small and medium brands optimize campaign creatives on Instagram.',
      categorySlug: 'content-marketing',
      authorEmail: 'sarah.content@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    },
    {
      title: 'OpenAI Introduces In-Conversation Plugin Recommendations Across ChatGPT',
      slug: 'openai-introduces-in-conversation-plugins',
      excerpt: 'ChatGPT now intelligently suggests specialized tools and verified plugins mid-conversation based on contextual problem statements.',
      categorySlug: 'ai-writing',
      authorEmail: 'admin@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    },
    {
      title: 'Google Search Console Adds Granular Filter for Generative AI Traffic',
      slug: 'google-search-console-adds-generative-ai-traffic-filters',
      excerpt: 'Webmasters and SEO teams gain new performance reporting filters distinguishing standard organic clicks from AI-driven search experiences.',
      categorySlug: 'seo',
      authorEmail: 'mark.seo@writtenlyhub.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
    },
  ];

  const results: Record<string, number> = {};

  for (const item of newsData) {
    const existing = await payload.find({
      collection: 'blogs',
      draft: true,
      where: {
        slug: {
          equals: item.slug,
        },
      },
    });

    if (existing.docs.length > 0) {
      await payload.delete({ collection: 'blogs', id: existing.docs[0].id });
    }

    const authorId = (resolvedUserIds && resolvedUserIds[item.authorEmail]) || defaultAuthorId;
    const categoryId = (resolvedCategoryIds && resolvedCategoryIds[item.categorySlug]) || Object.values(resolvedCategoryIds || {})[0];

    try {
      const created = await payload.create({
        collection: 'blogs',
        draft: false,
        data: {
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          contentType: 'news',
          featuredImage: defaultMediaId as unknown as number,
          author: authorId as unknown as number,
          category: categoryId as unknown as number,
          tags: [{ tag: 'news' }, { tag: item.categorySlug }],
          featuredHero: false,
          featuredArticle: false,
          sticky: false,
          _status: 'published',
          publishedAt: item.date,
          content: generateRichText(realisticLongFormContent),
        },
      });
      results[item.slug] = created.id;
    } catch (e) {
      payload.logger.error(`Failed to create news item ${item.title}: ${e}`);
    }
  }

  payload.logger.info(`✓ News articles seeded (${Object.keys(results).length} items)`);
  return results;
}
