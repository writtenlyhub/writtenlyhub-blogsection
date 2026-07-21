export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: Category;
  author: Author;
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  altText: string;
  featuredHero?: boolean;
  contentHtml?: string;
}

const AUTHOR_SARAH: Author = {
  id: '1',
  name: 'Sarah Jenkins',
  role: 'Lead Strategist',
  avatarUrl: '/images/authors/sarah.webp',
};

const AUTHOR_ALEX: Author = {
  id: '2',
  name: 'Alex Chen',
  role: 'SEO Specialist',
  avatarUrl: '/images/authors/alex.webp',
};

const AUTHOR_MARCUS: Author = {
  id: '3',
  name: 'Marcus Wright',
  role: 'Content Lead',
  avatarUrl: '/images/authors/marcus.webp',
};

const AUTHOR_ELENA: Author = {
  id: '4',
  name: 'Elena Rostova',
  role: 'Managing Editor',
  avatarUrl: '/images/authors/elena.webp',
};

const AUTHOR_DAVID: Author = {
  id: '5',
  name: 'David Kim',
  role: 'B2B Strategist',
  avatarUrl: '/images/authors/david.webp',
};

const AUTHOR_MARIA: Author = {
  id: '6',
  name: 'Maria Gonzalez',
  role: 'Analytics Expert',
  avatarUrl: '/images/authors/maria.webp',
};

const CAT_AI: Category = { id: 'c1', title: 'AI & Tech', slug: 'ai-tech' };
const CAT_SEO: Category = { id: 'c2', title: 'SEO', slug: 'seo' };
const CAT_CONTENT: Category = { id: 'c3', title: 'Content Marketing', slug: 'content-marketing' };
const CAT_STRATEGY: Category = { id: 'c4', title: 'Strategy', slug: 'strategy' };
const CAT_BRAND: Category = { id: 'c5', title: 'Brand Voice', slug: 'brand-voice' };

export const CATEGORIES: Category[] = [
  CAT_AI, CAT_SEO, CAT_CONTENT, CAT_STRATEGY, CAT_BRAND,
  { id: 'c6', title: 'Copywriting', slug: 'copywriting' },
  { id: 'c7', title: 'Case Studies', slug: 'case-studies' },
  { id: 'c8', title: 'Social Media', slug: 'social-media' },
  { id: 'c9', title: 'Email Marketing', slug: 'email-marketing' },
  { id: 'c10', title: 'Analytics', slug: 'analytics' },
  { id: 'c11', title: 'Industry News', slug: 'industry-news' },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'The Future of AI in Content Strategy',
    excerpt: 'As generative models become more sophisticated, the role of the content strategist shifts from creation to curation and prompt engineering. Discover how top brands are navigating this transition without losing their authentic voice.',
    slug: 'future-of-ai-content-strategy',
    category: CAT_AI,
    author: AUTHOR_SARAH,
    publishedDate: 'March 15, 2024',
    readTime: '12 min read',
    featuredImage: '/images/blog/future-of-ai-content-strategy.webp',
    altText: 'Modern developer workspace with glowing code screens representing AI workflows',
    featuredHero: true,
    contentHtml: `
      <p>The generative AI revolution is no longer just on the horizon—it is already fundamentally reshaping how marketing teams operate. However, as language models like GPT-4 and Claude 3 become more sophisticated, a new challenge has emerged: the sea of sameness.</p>
      
      <p>When every brand has access to the same baseline level of competence, simply producing grammatically correct content is no longer a competitive advantage. In this new era, the role of the content strategist shifts from mere creation to high-level curation, deep subject matter expertise, and advanced prompt engineering.</p>

      <h2>The Shift from Creation to Curation</h2>
      <p>Traditionally, a content marketer spent 80% of their time writing and 20% researching. Today, that ratio must flip. The most successful teams are spending the vast majority of their time on:</p>
      <ul>
        <li>Interviewing internal subject matter experts (SMEs).</li>
        <li>Analyzing proprietary data that AI cannot access.</li>
        <li>Curating unique viewpoints that challenge industry consensus.</li>
      </ul>

      <blockquote>
        <p>"AI can synthesize what is already known, but it takes a human to synthesize what is felt, experienced, and truly novel."</p>
      </blockquote>

      <h3>Building the 'Data Moat'</h3>
      <p>A data moat refers to the proprietary insights your company generates through its normal operations. If you are a SaaS company, this might be anonymized usage statistics. If you are an agency, it is the aggregated results of your client campaigns.</p>
      
      <p>When you feed this proprietary data into an LLM via Retrieval-Augmented Generation (RAG) or careful prompt engineering, the output ceases to be generic. It becomes uniquely yours.</p>

      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAly25P27UdqoR0I4M7WjSaktkZ5_gRULiaePaKnuISDzWsBoSJOWozJAceUGMdF2w0SzfZZ4M0jI1QdUnnIE6ZypaPyZIA7LXuQKN65GLnosOvov5Bu0z2SveynhU8tLsVx3ZjkUsagocDRsgysltO9Bf701mWUN7m5GDj9uaGZ6tPeWuaOCC09-SMjDjEyWlUXwZHVo5NBM2BHJ6sY0XOSxseEmChBw54qUm9L60HIJSxa9aWg_6ue3Q2A1gyUVh8s6KzkGgl-o" alt="Data visualization graph" />
      
      <h2>Advanced Prompt Engineering for Brand Voice</h2>
      <p>Getting an LLM to sound like your brand requires more than appending "write this in a professional but approachable tone." It requires systematic prompt architecture.</p>

      <ol>
        <li><strong>Establish the Persona:</strong> Define the exact role and worldview of the writer.</li>
        <li><strong>Provide Few-Shot Examples:</strong> Feed the model 3-5 examples of your best-performing content.</li>
        <li><strong>Define the Anti-Voice:</strong> Explicitly tell the model what words, phrases, and structures to avoid (e.g., "Do not use the word 'delve' or 'tapestry'").</li>
      </ol>

      <h3>The Future is Hybrid</h3>
      <p>We are entering a hybrid era of content strategy. The winners will not be the teams that stubbornly refuse to use AI, nor will it be the teams that fully automate their publishing pipelines. The winners will be the <em>centaurs</em>—human strategists utilizing AI to amplify their unique insights and execute at unprecedented scale.</p>
    `
  },
  {
    id: '2',
    title: 'Mastering Semantic Search in 2024',
    excerpt: 'Keyword stuffing is dead. Learn how structuring your content for entity recognition and user intent can drastically improve your organic visibility.',
    slug: 'mastering-semantic-search-2024',
    category: CAT_SEO,
    author: AUTHOR_ALEX,
    publishedDate: 'March 10, 2024',
    readTime: '5 min read',
    featuredImage: '/images/blog/mastering-semantic-search-2024.webp',
    altText: 'Close up of a financial analytics dashboard and graphs',
  },
  {
    id: '3',
    title: 'Measuring Content ROI Beyond Pageviews',
    excerpt: 'Traffic is vanity; engagement is sanity. A deep dive into the metrics that actually matter when evaluating the success of your content campaigns.',
    slug: 'measuring-content-roi-beyond-pageviews',
    category: CAT_CONTENT,
    author: AUTHOR_MARCUS,
    publishedDate: 'March 08, 2024',
    readTime: '8 min read',
    featuredImage: '/images/blog/measuring-content-roi.webp',
    altText: 'Marketing team collaborating closely in a modern office space',
  },
  {
    id: '4',
    title: 'Building a Resilient Editorial Calendar',
    excerpt: 'How to design a publishing schedule that withstands shifting priorities, unexpected trends, and team bandwidth constraints.',
    slug: 'building-resilient-editorial-calendar',
    category: CAT_STRATEGY,
    author: AUTHOR_ELENA,
    publishedDate: 'March 05, 2024',
    readTime: '4 min read',
    featuredImage: '/images/blog/building-resilient-editorial-calendar.webp',
    altText: 'Team looking over a content strategy roadmap on a table',
  },
  {
    id: '5',
    title: 'Maintaining Consistency Across Channels',
    excerpt: 'Strategies to ensure your brand sounds like itself whether it\'s a technical whitepaper, a witty tweet, or an automated email sequence.',
    slug: 'maintaining-consistency-across-channels',
    category: CAT_BRAND,
    author: AUTHOR_SARAH,
    publishedDate: 'March 02, 2024',
    readTime: '6 min read',
    featuredImage: '/images/blog/maintaining-consistency-across-channels.webp',
    altText: 'Cohesive team having a brand strategy discussion over coffee',
  },
  {
    id: '6',
    title: 'Prompt Engineering for B2B Content',
    excerpt: 'Discover the specific frameworks and prompts that leading B2B marketers use to generate high-quality thought leadership drafts with AI.',
    slug: 'prompt-engineering-b2b-content',
    category: CAT_AI,
    author: AUTHOR_DAVID,
    publishedDate: 'February 28, 2024',
    readTime: '7 min read',
    featuredImage: '/images/blog/prompt-engineering-b2b-content.webp',
    altText: 'Bright modern workspace representing B2B content generation',
  },
  {
    id: '7',
    title: 'The Impact of SGE on Organic Traffic',
    excerpt: 'Google\'s Search Generative Experience is changing the landscape. Here is our early data on how it impacts click-through rates and what you should do.',
    slug: 'impact-of-sge-organic-traffic',
    category: CAT_SEO,
    author: AUTHOR_MARIA,
    publishedDate: 'February 25, 2024',
    readTime: '10 min read',
    featuredImage: '/images/blog/impact-of-sge-organic-traffic.webp',
    altText: 'Laptop displaying SEO traffic graphs and analytics',
  },
  {
    id: '8',
    title: 'Automating Content Workflows with AI',
    excerpt: 'How to build automated pipelines that scale your content production without sacrificing quality or brand voice.',
    slug: 'automating-content-workflows',
    category: CAT_AI,
    author: AUTHOR_ALEX,
    publishedDate: 'February 20, 2024',
    readTime: '6 min read',
    featuredImage: '/images/blog/automating-content-workflows.webp',
    altText: 'Clean minimalist desk with a laptop and organized notebooks',
  },
  {
    id: '9',
    title: 'Evaluating LLMs for Marketing Copy',
    excerpt: 'Not all language models are created equal. We tested GPT-4, Claude 3, and Gemini for marketing copy to see which performs best.',
    slug: 'evaluating-llms-marketing',
    category: CAT_AI,
    author: AUTHOR_SARAH,
    publishedDate: 'February 15, 2024',
    readTime: '9 min read',
    featuredImage: '/images/blog/evaluating-llms-marketing.webp',
    altText: 'Professional examining text and code on a dual-screen setup',
  },
  {
    id: '10',
    title: 'Technical SEO Audit Checklist 2024',
    excerpt: 'The ultimate technical SEO checklist to ensure your website meets modern crawling, indexing, and core web vitals standards.',
    slug: 'technical-seo-audit-2024',
    category: CAT_SEO,
    author: AUTHOR_MARCUS,
    publishedDate: 'February 10, 2024',
    readTime: '15 min read',
    featuredImage: '/images/blog/technical-seo-audit-2024.webp',
    altText: 'Data and technical charts on a glowing monitor screen',
  },
  {
    id: '11',
    title: 'How to Build a Demand Generation Engine',
    excerpt: 'Move past lead generation and build a demand generation engine that drives high-intent pipelines using organic content.',
    slug: 'freelancer-guide-pitching',
    category: CAT_CONTENT,
    author: AUTHOR_ELENA,
    publishedDate: 'February 05, 2024',
    readTime: '11 min read',
    featuredImage: '/images/blog/freelancer-guide-pitching.webp',
    altText: 'A marketer presenting demand generation strategies to a team',
  },
  {
    id: '12',
    title: 'Content Syndication Best Practices',
    excerpt: 'Distribute your content to millions without risking duplicate content penalties. A complete guide to modern syndication.',
    slug: 'content-syndication-best-practices',
    category: CAT_CONTENT,
    author: AUTHOR_DAVID,
    publishedDate: 'February 01, 2024',
    readTime: '7 min read',
    featuredImage: '/images/blog/content-syndication-best-practices.webp',
    altText: 'Sleek modern office laptops representing content distribution',
  }
];
