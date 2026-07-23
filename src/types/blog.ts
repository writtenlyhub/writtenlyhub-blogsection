export interface MockContentNode {
  type: 'paragraph' | 'heading-2' | 'heading-3' | 'link' | 'text' | 'ul' | 'ol' | 'li' | 'blockquote' | 'hr' | 'code-block' | 'upload' | 'block-quote' | 'block-keyTakeaways' | 'block-cta' | 'block-watchLearn' | 'block-faq' | 'block-expertInsight' | 'block-quickFacts' | 'block-callout';
  id?: string;
  text?: string;
  url?: string;
  language?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  relationTo?: string;
  children?: MockContentNode[];
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface UI_Category {
  id: string;
  title: string;
  slug: string;
}

export interface UI_Author {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface UI_Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: UI_Category;
  author: UI_Author;
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  altText: string;
  featuredHero?: boolean;
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
  isDraft?: boolean;
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
  content: MockContentNode[];
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
