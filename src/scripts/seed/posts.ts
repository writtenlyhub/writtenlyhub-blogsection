import type { Payload } from 'payload';
import {
  createParagraph,
  createHeading,
  createList,
  createBlock,
  generateRichText,
} from './lexical';

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
      results[post.slug] = existing.docs[0].id;
      continue;
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
          content: generateRichText([
            createParagraph('This is the introductory paragraph to the article. It hooks the reader and explains what they will learn.'),
            createHeading('Why This Matters Today', 'h2'),
            createParagraph('In a rapidly evolving digital ecosystem, staying ahead of the curve is no longer optional—it is a necessity for survival.'),
            createBlock('keyTakeaways', {
              title: 'Key Takeaways',
              items: [
                { item: 'First important point to remember.' },
                { item: 'Second crucial concept.' },
                { item: 'Third actionable takeaway.' },
              ],
            }),
            createHeading('Deep Dive into the Details', 'h2'),
            createParagraph('Here are some statistics and insights to consider when planning your strategy.'),
            createBlock('quickFacts', {
              title: 'Quick Facts',
              facts: [
                { fact: '75% of users never scroll past the first page.' },
                { fact: 'Content marketing costs 62% less than traditional marketing.' },
              ],
            }),
            createBlock('quote', {
              quote: 'Content is king, but engagement is queen, and the lady rules the house.',
              label: 'Mari Smith',
            }),
            createBlock('expertInsight', {
              quote: 'To succeed in modern SEO, you must focus on user intent above all else.',
              label: 'Expert SEO Analysis',
            }),
            createHeading('Common Pitfalls', 'h3'),
            createParagraph('Many businesses make the mistake of focusing entirely on volume rather than quality.'),
            createList(['Ignoring search intent', 'Poor mobile optimization', 'Slow page speed']),
            createBlock('callout', {
              title: 'Pro Tip',
              content: 'Always optimize your images and minify your CSS/JS before pushing to production.',
              type: 'pro-tip',
            }),
            createBlock('watchLearn', {
              title: 'Watch & Learn',
              description: 'Watch our comprehensive video tutorial to see these strategies in action.',
              buttonText: 'Watch Video',
              buttonLink: 'https://youtube.com',
            }),
            createHeading('Frequently Asked Questions', 'h2'),
            createBlock('faq', {
              title: 'Common Questions',
              items: [
                { question: 'How long does SEO take?', answer: 'Typically 3-6 months to see significant results.' },
                { question: 'Is AI writing safe for SEO?', answer: 'Yes, as long as it is edited for accuracy and provides real value.' },
              ],
            }),
            createBlock('cta', {
              title: 'Ready to elevate your strategy?',
              description: 'Contact our team of experts today.',
              buttonText: 'Get Started',
              buttonLink: '/contact',
            }),
          ]),
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
