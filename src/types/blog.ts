export interface MockContentNode {
  type: 'paragraph' | 'heading-2' | 'heading-3' | 'link' | 'text';
  text?: string;
  url?: string;
  children?: MockContentNode[];
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface BlogHeroData {
  category: string;
  title: string;
  summary: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface QuoteData {
  quote: string;
  label?: string;
}

export interface KeyTakeawaysData {
  title?: string;
  items: string[];
}

export interface CTAData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleCard {
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  link: string;
}

export interface BlogDetailData {
  hero: BlogHeroData;
  toc: TocItem[];
  contentBlocks: {
    intro: MockContentNode[];
    section1: MockContentNode[];
    section2: MockContentNode[];
    section2_afterImage: MockContentNode[];
    section3: MockContentNode[];
    conclusion: MockContentNode[];
  };
  quote: QuoteData | null;
  keyTakeaways: KeyTakeawaysData | null;
  inlineCTA: CTAData | null;
  aboutAuthor: Author | null;
  footerCTA: CTAData | null;
  watchLearn: CTAData | null;
  faqs: {
    title?: string;
    items: FAQItem[];
  } | null;
  relatedArticles: ArticleCard[];
}
