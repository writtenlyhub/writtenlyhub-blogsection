import { BlogDetailData, MockContentNode, TocItem } from '@/types/blog';
import { MOCK_BLOGS, CATEGORIES as MOCK_CATEGORIES, Blog as UI_Blog, Category as UI_Category, Author as UI_Author } from '@/data/mockBlogs';
import { MOCK_DATA as DETAILED_MOCK_DATA } from '@/lib/mock/blog';
import type { Blog, User, Media, Category, Tag } from '@/payload-types';

/**
 * Type guard for Media
 */
function isMedia(media: number | Media | undefined | null): media is Media {
  return typeof media === 'object' && media !== null && 'url' in media;
}

/**
 * Type guard for User
 */
function isUser(user: number | User | undefined | null): user is User {
  return typeof user === 'object' && user !== null && 'name' in user;
}

/**
 * Type guard for Category
 */
function isCategory(category: number | Category | undefined | null): category is Category {
  return typeof category === 'object' && category !== null && 'name' in category;
}

/**
 * Transform Payload Lexical nodes to MockContentNode expected by existing UI
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformLexicalToMockNodes(lexicalNodes: any[]): MockContentNode[] {
  if (!lexicalNodes || !Array.isArray(lexicalNodes)) return [];

  return lexicalNodes.map((node) => {
    // Handle Text Nodes
    if (node.type === 'text') {
      return {
        type: 'text',
        text: node.text || '',
      };
    }

    // Handle Links
    if (node.type === 'link') {
      return {
        type: 'link',
        url: node.fields?.url || '#',
        children: transformLexicalToMockNodes(node.children),
      };
    }

    // Handle Headings (h2, h3)
    if (node.type === 'heading') {
      const level = node.tag === 'h2' ? 'heading-2' : 'heading-3';
      return {
        type: level,
        children: transformLexicalToMockNodes(node.children),
      };
    }

    // Default to paragraph for unknown or standard text blocks
    return {
      type: 'paragraph',
      children: transformLexicalToMockNodes(node.children),
    };
  });
}

/**
 * Extracts a specific block type from Lexical blocks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractBlock(nodes: any[], blockSlug: string): any | null {
  if (!nodes || !Array.isArray(nodes)) return null;
  const block = nodes.find((n) => n.type === 'block' && n.fields?.blockType === blockSlug);
  return block ? block.fields : null;
}

/**
 * Filter out custom blocks to just return text/structural nodes
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterOutBlocks(nodes: any[]): any[] {
  if (!nodes || !Array.isArray(nodes)) return [];
  return nodes.filter((n) => n.type !== 'block');
}

/**
 * Maps the raw Payload document to the 'BlogDetailData' interface expected by our UI.
 */
export function mapBlogData(post: Blog | null | undefined): BlogDetailData | null {
  if (!post) {
    return null;
  }

  // Author Resolution
  const author = isUser(post.author)
    ? {
        name: post.author.name,
        role: post.author.designation || post.author.role,
        bio: post.author.bio || '',
        avatarUrl: isMedia(post.author.avatar) ? post.author.avatar.url || '' : '',
      }
    : DETAILED_MOCK_DATA.aboutAuthor || {
        name: DETAILED_MOCK_DATA.hero.author.name,
        role: 'Author',
        bio: '',
        avatarUrl: DETAILED_MOCK_DATA.hero.author.avatarUrl,
      };

  // Category Resolution
  const categoryName = isCategory(post.category) ? post.category.name : 'Category';

  // Featured Image Resolution
  const imageUrl = isMedia(post.featuredImage) ? post.featuredImage.url || '' : '';
  const imageAlt = isMedia(post.featuredImage) ? post.featuredImage.alt || post.title : post.title;

  // Lexical Content Root
  const rootChildren = post.content?.root?.children || [];
  
  // Extract custom blocks
  const quoteBlock = extractBlock(rootChildren, 'quote');
  const keyTakeawaysBlock = extractBlock(rootChildren, 'keyTakeaways');
  const inlineCTABlock = extractBlock(rootChildren, 'cta');
  const footerCTABlock = extractBlock(rootChildren, 'cta'); // We can use CTA for footer too
  const watchLearnBlock = extractBlock(rootChildren, 'watchLearn');
  const faqBlock = extractBlock(rootChildren, 'faq');

  // Filter out blocks to get pure text content
  const textNodes = filterOutBlocks(rootChildren);

  // Partition text nodes roughly into the sections the UI expects
  // In a real dynamic scenario, the UI would loop over nodes, but we must adhere
  // to the strict constraint: "Do not refactor the existing UI components."
  const introNodes = textNodes.slice(0, 2);
  const section1Nodes = textNodes.slice(2, 4);
  const section2Nodes = textNodes.slice(4, 6);
  const section2AfterNodes = textNodes.slice(6, 8);
  const section3Nodes = textNodes.slice(8, 10);
  const conclusionNodes = textNodes.slice(10);

  // Map TOC (Generate automatically from headings)
  const toc: TocItem[] = textNodes
    .filter((n) => n.type === 'heading')
    .map((h, i) => {
      // Find text recursively
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getText = (nodes: any[]): string => {
        return nodes.map((n) => (n.type === 'text' ? n.text : getText(n.children || []))).join('');
      };
      const text = getText(h.children || []);
      return {
        id: `heading-${i}`,
        title: text || 'Section',
        level: h.tag === 'h2' ? 2 : 3,
      };
    });

  // Map Related Articles
  const relatedArticles = (post.relatedArticles || []).flatMap((rel) => {
    if (typeof rel === 'object' && rel !== null && 'title' in rel) {
      const relCat = isCategory(rel.category) ? rel.category.name : 'Category';
      const relImg = isMedia(rel.featuredImage) ? rel.featuredImage.url || '' : '';
      return [{
        title: rel.title,
        summary: rel.excerpt || '',
        category: relCat,
        date: rel.publishedAt ? new Date(rel.publishedAt).toLocaleDateString() : '',
        readTime: rel.readTime || '5 min read',
        imageUrl: relImg,
        link: `/blog/${rel.slug}`,
      }];
    }
    return [];
  });

  return {
    hero: {
      category: categoryName,
      title: post.title,
      summary: post.excerpt || '',
      author: author,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
      updatedAt: post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : '',
      readTime: post.readTime || '5 min read',
      imageUrl: imageUrl,
      imageAlt: imageAlt,
    },
    toc: toc.length > 0 ? toc : DETAILED_MOCK_DATA.toc,
    contentBlocks: {
      intro: introNodes.length > 0 ? transformLexicalToMockNodes(introNodes) : DETAILED_MOCK_DATA.contentBlocks.intro,
      section1: section1Nodes.length > 0 ? transformLexicalToMockNodes(section1Nodes) : DETAILED_MOCK_DATA.contentBlocks.section1,
      section2: section2Nodes.length > 0 ? transformLexicalToMockNodes(section2Nodes) : DETAILED_MOCK_DATA.contentBlocks.section2,
      section2_afterImage: section2AfterNodes.length > 0 ? transformLexicalToMockNodes(section2AfterNodes) : DETAILED_MOCK_DATA.contentBlocks.section2_afterImage,
      section3: section3Nodes.length > 0 ? transformLexicalToMockNodes(section3Nodes) : DETAILED_MOCK_DATA.contentBlocks.section3,
      conclusion: conclusionNodes.length > 0 ? transformLexicalToMockNodes(conclusionNodes) : DETAILED_MOCK_DATA.contentBlocks.conclusion,
    },
    quote: quoteBlock
      ? {
          quote: quoteBlock.quote,
          label: quoteBlock.label,
        }
      : DETAILED_MOCK_DATA.quote,
    keyTakeaways: keyTakeawaysBlock
      ? {
          title: keyTakeawaysBlock.title,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items: keyTakeawaysBlock.items.map((i: any) => i.item),
        }
      : DETAILED_MOCK_DATA.keyTakeaways,
    inlineCTA: inlineCTABlock
      ? {
          title: inlineCTABlock.title,
          description: inlineCTABlock.description,
          buttonText: inlineCTABlock.buttonText,
          buttonLink: inlineCTABlock.buttonLink,
        }
      : DETAILED_MOCK_DATA.inlineCTA,
    aboutAuthor: {
      ...author,
    },
    footerCTA: footerCTABlock
      ? {
          title: footerCTABlock.title,
          description: footerCTABlock.description,
          buttonText: footerCTABlock.buttonText,
          buttonLink: footerCTABlock.buttonLink,
        }
      : DETAILED_MOCK_DATA.footerCTA,
    watchLearn: watchLearnBlock
      ? {
          title: watchLearnBlock.title,
          description: watchLearnBlock.description,
          buttonText: watchLearnBlock.buttonText,
          buttonLink: watchLearnBlock.buttonLink,
        }
      : DETAILED_MOCK_DATA.watchLearn,
    faqs: faqBlock
      ? {
          title: faqBlock.title,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items: faqBlock.items.map((i: any) => ({
            question: i.question,
            answer: i.answer,
          })),
        }
      : DETAILED_MOCK_DATA.faqs,
    relatedArticles: relatedArticles.length > 0 ? relatedArticles : [],
  };
}

/**
 * Maps a list of Payload Blogs to the UI Blog format used in listing pages
 */
export function mapBlogList(posts: Blog[] | undefined): UI_Blog[] {
  if (!posts || posts.length === 0) {
    return MOCK_BLOGS;
  }

  return posts.map(post => {
    const author: UI_Author = isUser(post.author)
      ? {
          id: post.author.id.toString(),
          name: post.author.name,
          role: post.author.designation || post.author.role,
          avatarUrl: isMedia(post.author.avatar) ? post.author.avatar.url || '' : '',
        }
      : MOCK_BLOGS[0].author;

    const category: UI_Category = isCategory(post.category)
      ? {
          id: post.category.id.toString(),
          title: post.category.name,
          slug: post.category.slug || '',
        }
      : MOCK_CATEGORIES[0];

    const featuredImage = isMedia(post.featuredImage) ? post.featuredImage.url || '' : '';
    const altText = isMedia(post.featuredImage) ? post.featuredImage.alt || post.title : post.title;

    return {
      id: post.id.toString(),
      title: post.title,
      excerpt: post.excerpt || '',
      slug: post.slug || '',
      category,
      author,
      publishedDate: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
      readTime: post.readTime || '5 min read',
      featuredImage,
      altText,
      featuredHero: post.featuredHero || false,
    };
  });
}

/**
 * Maps a list of Payload Categories to the UI Category format
 */
export function mapCategoryList(categories: Category[] | undefined): UI_Category[] {
  if (!categories || categories.length === 0) {
    return MOCK_CATEGORIES;
  }

  return categories.map(cat => ({
    id: cat.id.toString(),
    title: cat.name,
    slug: cat.slug || '',
  }));
}
