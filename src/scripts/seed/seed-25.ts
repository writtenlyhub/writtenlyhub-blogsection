import payload from 'payload';
import { generateRichText, createParagraph, createHeading, createList, createBlock, createTextNode } from './lexical';

export function createLinkNode(url: string, text: string) {
  return {
    type: 'link',
    version: 1,
    fields: { url, newTab: true },
    children: [createTextNode(text)],
    direction: null,
    format: '',
    indent: 0,
  };
}

export function createParagraphWithLink(prefix: string, url: string, linkText: string, suffix: string) {
  return {
    type: 'paragraph',
    version: 1,
    format: '',
    indent: 0,
    direction: null,
    children: [
      createTextNode(prefix),
      createLinkNode(url, linkText),
      createTextNode(suffix),
    ],
  };
}

export function createUploadNode(mediaId: number) {
  return {
    type: 'upload',
    version: 1,
    value: mediaId,
    relationTo: 'media',
    fields: {},
  };
}

const TOPICS = [
  "The Future of B2B Marketing in an AI World",
  "10 Advanced SEO Techniques for 2027",
  "Mastering the Art of Copywriting",
  "How to Build a SaaS Content Strategy from Scratch",
  "The Ultimate Guide to Technical SEO Audits",
  "Why Your Business Needs a Dedicated Blog in 2027",
  "Demystifying AI Generative Search",
  "Top 5 UX Mistakes Killing Your Conversions",
  "Email Marketing Strategies that Actually Work",
  "The Freelancer’s Guide to Pitching Clients",
  "The ROI of Video Marketing in B2B",
  "Content Personalization at Scale Using AI",
  "Building a Brand Moat with Original Research",
  "The Psychology of High-Converting Landing Pages",
  "How to Hire and Scale a World-Class Content Team",
  "Social Media Marketing: Organic vs Paid Strategies",
  "Leveraging LinkedIn for B2B Lead Generation",
  "The Rise of Zero-Click Search and How to Adapt",
  "Creating Marketing Dashboards that Executives Actually Read",
  "E-commerce SEO Strategies for Explosive Growth",
  "The Complete Guide to Marketing Automation",
  "Podcasting for Brands: A Strategic Playbook",
  "Influencer Marketing in the B2B Space",
  "Web3 Marketing: Hype vs Reality",
  "The Anatomy of a Perfect Case Study"
];

const LOREM_PARAGRAPHS = [
  "In today's hyper-competitive digital landscape, relying on outdated strategies is a recipe for stagnation. Forward-thinking companies are constantly adapting their methodologies to align with emerging technologies and shifting consumer expectations. This proactive approach ensures sustainable growth and long-term brand relevance.",
  "When analyzing the core drivers of organic growth, one must look beyond superficial metrics. True audience engagement stems from a deep understanding of customer pain points, translated into actionable, empathetic content. It's about fostering a community rather than merely broadcasting a message.",
  "Data-driven decision making has transitioned from a competitive advantage to a fundamental necessity. By leveraging advanced analytics, teams can pivot with agility, optimizing campaigns in real-time to maximize ROI and minimize wasted spend.",
  "Furthermore, the integration of generative AI into daily workflows has democratized high-quality output, allowing smaller teams to punch above their weight class. However, human oversight remains critical to ensure brand voice consistency and factual accuracy.",
  "Consider the long-term implications of these shifts. Brands that invest in proprietary data and original research establish an authoritative moat that algorithmic volatility cannot easily erode. This foundational strength pays dividends across all marketing channels."
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicArticle(mediaId: number, index: number) {
  const content = [];
  
  // Intro paragraphs
  for (let i = 0; i < 3; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));
  
  content.push(createUploadNode(mediaId));
  content.push(createParagraphWithLink("For more context, be sure to read our detailed analysis on ", "https://example.com/resources", "industry benchmarks", " which outlines these core concepts."));

  content.push(createHeading(`Section 1: The Core Methodology`, 'h2'));
  for (let i = 0; i < 3; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));
  
  content.push(createBlock('keyTakeaways', {
    title: 'Key Insights',
    items: [
      { item: 'Focus on information gain over generic summaries.' },
      { item: 'Leverage multi-format distribution networks.' },
      { item: 'Always build owned audience channels.' }
    ],
  }));

  content.push(createHeading(`Section 2: Implementing the Strategy`, 'h2'));
  for (let i = 0; i < 4; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));

  content.push(createList([
    'Step 1: Conduct a thorough gap analysis.',
    'Step 2: Define your unique brand narrative.',
    'Step 3: Establish a rigorous editorial calendar.',
    'Step 4: Execute, measure, and iterate.'
  ], 'number'));

  content.push(createHeading(`Section 3: Advanced Tactics`, 'h2'));
  for (let i = 0; i < 3; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));
  
  content.push(createUploadNode(mediaId));
  
  content.push(createBlock('quote', {
    quote: 'Innovation distinguishes between a leader and a follower. In marketing, stagnation is the enemy.',
    label: 'Industry Expert'
  }));
  
  content.push(createHeading(`Section 4: Measuring Success`, 'h2'));
  for (let i = 0; i < 3; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));

  content.push(createBlock('faq', {
    title: 'Frequently Asked Questions',
    items: [
      { question: 'What is the most important metric?', answer: 'Pipeline generated and closed-won revenue.' },
      { question: 'How long does it take to see results?', answer: 'Typically 3 to 6 months depending on consistency and market saturation.' },
      { question: 'Do we need a massive team?', answer: 'No, a lean team armed with AI tools and strong strategy can execute effectively.' }
    ]
  }));

  content.push(createHeading(`Conclusion`, 'h2'));
  for (let i = 0; i < 2; i++) content.push(createParagraph(getRandom(LOREM_PARAGRAPHS) + " " + getRandom(LOREM_PARAGRAPHS)));
  
  content.push(createBlock('cta', {
    title: 'Ready to transform your strategy?',
    description: 'Join our community of thousands of marketers leveraging cutting-edge tactics.',
    buttonText: 'Get Started Today',
    buttonLink: '/contact'
  }));

  return content;
}

export async function seed25Blogs(payload: any) {
  payload.logger.info('— Purging existing blogs...');
  
  const existingBlogs = await payload.find({ collection: 'blogs', limit: 100 });
  for (const blog of existingBlogs.docs) {
    await payload.delete({ collection: 'blogs', id: blog.id });
  }

  payload.logger.info('— Fetching reference IDs...');
  const users = await payload.find({ collection: 'users', limit: 1 });
  const categories = await payload.find({ collection: 'categories', limit: 1 });
  const media = await payload.find({ collection: 'media', limit: 1 });

  if (!users.docs.length || !categories.docs.length || !media.docs.length) {
    throw new Error("Missing required seed data (User, Category, or Media)");
  }

  const authorId = users.docs[0].id;
  const categoryId = categories.docs[0].id;
  const mediaId = media.docs[0].id;

  payload.logger.info(`— Seeding 25 Massive Blogs...`);

  let count = 1;
  for (const topic of TOPICS) {
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const excerpt = `A deep dive into ${topic.toLowerCase()}, exploring advanced strategies, essential tools, and the metrics you need to track for long-term success.`;
    
    // SEO fields
    const metaTitle = `${topic} | WrittenlyHub Analysis`;
    const metaDescription = `Learn everything you need to know about ${topic.toLowerCase()}. Our comprehensive guide breaks down the strategies and tactics required to dominate your niche.`;
    const focusKeyword = topic.split(' ').slice(0, 3).join(' ').toLowerCase();

    try {
      await payload.create({
        collection: 'blogs',
        data: {
          title: topic,
          slug,
          excerpt,
          featuredImage: mediaId,
          author: authorId,
          category: categoryId,
          tags: [],
          featuredHero: count === 1, // Only first one gets featured hero
          featuredArticle: count > 1 && count <= 4, // 3 featured articles
          sticky: false,
          _status: 'published',
          publishedAt: new Date().toISOString(),
          content: generateRichText(generateDynamicArticle(mediaId, count)),
          
          // SEO
          metaTitle: metaTitle.substring(0, 60),
          metaDescription: metaDescription.substring(0, 160),
          focusKeyword,
          canonicalUrl: `https://writtenlyhub.com/blog/${slug}`,
          ogTitle: metaTitle,
          ogDescription: metaDescription,
          twitterTitle: metaTitle,
          twitterDescription: metaDescription,
          robots: {
            index: true,
            follow: true,
            noarchive: false,
            nosnippet: false,
            noimageindex: false,
          }
        },
      });
      payload.logger.info(`✓ Created [${count}/25]: ${topic}`);
      count++;
    } catch (e) {
      payload.logger.error(`Failed to create post ${topic}: ${e}`);
    }
  }

  payload.logger.info(`✅ Successfully seeded 25 massive blog posts!`);
}
