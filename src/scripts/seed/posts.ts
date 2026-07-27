import type { Payload } from 'payload';
import {
  createParagraph,
  createHeading,
  createList,
  createBlock,
  generateRichText,
} from './lexical';
import { realisticLongFormContent } from './mockContent';

export async function seedPosts(
  payload: Payload,
  mediaIds: Record<string, number>,
  userIds: Record<string, number>,
  categoryIds: Record<string, number>,
  tagIds: Record<string, number>
) {
  payload.logger.info('— Seeding Blog Posts...');

  const postsData = [
    {
      title: 'The Future of Content Marketing in an AI World',
      slug: 'future-content-marketing-ai',
      excerpt: 'How artificial intelligence is reshaping the landscape of digital content creation and what you need to do to stay ahead.',
      featuredHero: true,
      featuredArticle: false,
      sticky: true,
      authorEmail: 'sarah.content@writtenlyhub.com',
      categorySlug: 'content-marketing',
      tagSlugs: ['ai', 'content-strategy', 'marketing'],
    },
    {
      title: '10 Advanced SEO Techniques for 2026',
      slug: 'advanced-seo-techniques-2026',
      excerpt: 'Go beyond the basics with these advanced search engine optimization strategies that are proven to drive organic traffic.',
      featuredHero: false,
      featuredArticle: true,
      sticky: false,
      authorEmail: 'mark.seo@writtenlyhub.com',
      categorySlug: 'seo',
      tagSlugs: ['seo', 'google', 'search'],
    },
    {
      title: 'Mastering the Art of Copywriting',
      slug: 'mastering-art-of-copywriting',
      excerpt: 'Learn the psychological triggers and writing techniques that convert casual readers into loyal customers.',
      featuredHero: false,
      featuredArticle: true,
      sticky: false,
      authorEmail: 'sarah.content@writtenlyhub.com',
      categorySlug: 'copywriting',
      tagSlugs: ['marketing', 'lead-generation'],
    },
    {
      title: 'How to Build a SaaS Content Strategy from Scratch',
      slug: 'saas-content-strategy-from-scratch',
      excerpt: 'A comprehensive guide to developing a content marketing machine for your Software as a Service startup.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'sarah.content@writtenlyhub.com',
      categorySlug: 'content-marketing',
      tagSlugs: ['saas', 'startups', 'content-strategy'],
    },
    {
      title: 'The Ultimate Guide to Technical SEO Audits',
      slug: 'ultimate-guide-technical-seo-audits',
      excerpt: 'Step-by-step instructions on how to uncover and fix the technical issues holding back your website rankings.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'mark.seo@writtenlyhub.com',
      categorySlug: 'seo',
      tagSlugs: ['seo', 'google'],
    },
    {
      title: 'Why Your Business Needs a Dedicated Blog in 2026',
      slug: 'why-business-needs-blog-2026',
      excerpt: 'Despite the rise of social media and video content, a dedicated blog remains the cornerstone of digital marketing.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'admin@writtenlyhub.com',
      categorySlug: 'blogging',
      tagSlugs: ['blogging', 'marketing'],
    },
    {
      title: 'Demystifying AI Generative Search',
      slug: 'demystifying-ai-generative-search',
      excerpt: 'What happens to traditional SEO when AI answers the user’s query directly? Here’s our deep dive.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'mark.seo@writtenlyhub.com',
      categorySlug: 'ai-writing',
      tagSlugs: ['ai', 'google', 'search'],
    },
    {
      title: 'Top 5 UX Mistakes Killing Your Conversions',
      slug: 'top-5-ux-mistakes',
      excerpt: 'Are your visitors leaving before making a purchase? Your user experience might be to blame.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'sarah.content@writtenlyhub.com',
      categorySlug: 'digital-marketing',
      tagSlugs: ['ux', 'web-design'],
    },
    {
      title: 'Email Marketing Strategies that Actually Work',
      slug: 'email-marketing-strategies',
      excerpt: 'Stop sending emails into the void. Here is how to write newsletters that get opened and clicked.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'admin@writtenlyhub.com',
      categorySlug: 'digital-marketing',
      tagSlugs: ['email-marketing', 'lead-generation'],
    },
    {
      title: 'The Freelancer’s Guide to Pitching Clients',
      slug: 'freelancer-guide-pitching',
      excerpt: 'Learn how to write cold emails and pitches that land high-paying clients consistently.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'sarah.content@writtenlyhub.com',
      categorySlug: 'copywriting',
      tagSlugs: ['freelancing', 'productivity'],
    },
    {
      title: 'Content Personalization at Scale Using AI',
      slug: 'content-personalization-at-scale-ai',
      excerpt: 'How to leverage machine learning algorithms to deliver hyper-personalized content experiences without expanding your team.',
      featuredHero: false,
      featuredArticle: true,
      sticky: false,
      authorEmail: 'mark.seo@writtenlyhub.com',
      categorySlug: 'ai-writing',
      tagSlugs: ['ai', 'content-strategy', 'marketing'],
    },
    {
      title: 'The ROI of Video Marketing in B2B',
      slug: 'roi-video-marketing-b2b',
      excerpt: 'Why B2B companies are shifting their budgets to video content, and how you can measure the true return on investment.',
      featuredHero: false,
      featuredArticle: false,
      sticky: false,
      authorEmail: 'admin@writtenlyhub.com',
      categorySlug: 'digital-marketing',
      tagSlugs: ['video', 'marketing', 'b2b'],
    },
  ];

  const results: Record<string, number> = {};

  for (const post of postsData) {
    const existing = await payload.find({
      collection: 'blogs',
      where: {
        slug: {
          equals: post.slug,
        },
      },
    });

    if (existing.docs.length > 0) {
      await payload.delete({ collection: 'blogs', id: existing.docs[0].id });
    }

    try {
      const created = await payload.create({
        collection: 'blogs',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featuredImage: mediaIds['cover-1.svg'] as any as any,
          author: userIds[post.authorEmail] as any,
          category: categoryIds[post.categorySlug] as any,
          tags: post.tagSlugs.map((slug) => ({ tag: slug })),
          featuredHero: post.featuredHero,
          featuredArticle: post.featuredArticle,
          sticky: post.sticky,
          _status: 'published',
          publishedAt: new Date().toISOString(),
          content: generateRichText(realisticLongFormContent),
        },
      });
      results[post.slug] = created.id;
    } catch (e) {
      payload.logger.error(`Failed to create post ${post.title}: ${e}`);
    }
  }

  payload.logger.info(`✓ Posts seeded (${Object.keys(results).length} items)`);
  return results;
}
