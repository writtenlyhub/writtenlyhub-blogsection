import { BlogDetailData, MockContentNode, TocItem, Author as UI_Author } from '@/types/blog';
import type { Blog, User, Media, Category, Tag } from '@/payload-types';

export interface UI_Category {
  id: string;
  title: string;
  slug: string;
}

export interface UI_Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: UI_Category;
  author: UI_Author & { id: string };
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  altText: string;
  featuredHero?: boolean;
}

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
 * Generate a stable ID from heading text
 */
function generateStableId(text: string, existingIds: Set<string>): string {
  const baseId = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  let id = baseId || 'section';
  let counter = 1;
  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }
  existingIds.add(id);
  return id;
}

/**
 * Transform Payload Lexical nodes to MockContentNode expected by existing UI
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformLexicalToMockNodes(lexicalNodes: any[]): MockContentNode[] {
  if (!lexicalNodes || !Array.isArray(lexicalNodes)) return [];

  return lexicalNodes.map((node) => {
    if (node.type === 'text') {
      return { type: 'text', text: node.text || '' };
    }
    if (node.type === 'link') {
      return { type: 'link', url: node.fields?.url || '#', children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'heading') {
      const level = node.tag === 'h2' ? 'heading-2' : 'heading-3';
      return { type: level, children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'list') {
      return { type: node.listType === 'number' ? 'ol' : 'ul', children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'listitem') {
      return { type: 'li', children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'quote') {
      return { type: 'blockquote', children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'horizontalrule') {
      return { type: 'hr' };
    }
    if (node.type === 'code') {
      return { type: 'code-block', language: node.language || 'typescript', children: transformLexicalToMockNodes(node.children) };
    }
    if (node.type === 'upload') {
      return { type: 'upload', value: node.value, relationTo: node.relationTo };
    }
    if (node.type === 'block') {
      const blockType = node.fields?.blockType;
      if (['quote', 'expertInsight', 'cta', 'watchLearn', 'keyTakeaways', 'quickFacts', 'callout', 'faq'].includes(blockType)) {
        return { type: `block-${blockType}` as any, data: node.fields };
      }
    }
    return { type: 'paragraph', children: transformLexicalToMockNodes(node.children) };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractBlock(nodes: any[], blockSlug: string): any | null {
  if (!nodes || !Array.isArray(nodes)) return null;
  const block = nodes.find((n) => n.type === 'block' && n.fields?.blockType === blockSlug);
  return block ? block.fields : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterOutBlocks(nodes: any[]): any[] {
  if (!nodes || !Array.isArray(nodes)) return [];
  return nodes.filter((n) => n.type !== 'block');
}

export function mapBlogData(post: Blog | null | undefined): BlogDetailData | null {
  if (!post) {
    return null;
  }

  const author = isUser(post.author)
    ? {
        name: post.author.name,
        role: post.author.designation || post.author.role || 'Author',
        bio: post.author.bio || '',
        avatarUrl: isMedia(post.author.avatar) ? post.author.avatar.url || '' : '',
      }
    : {
        name: 'Anonymous',
        role: 'Author',
        bio: '',
        avatarUrl: '',
      };

  const categoryName = isCategory(post.category) ? post.category.name : 'Uncategorized';
  const imageUrl = isMedia(post.featuredImage) ? post.featuredImage.url || '' : '';
  const imageAlt = isMedia(post.featuredImage) ? post.featuredImage.alt || post.title : post.title;

  const rootChildren = post.content?.root?.children || [];
  const parsedContent = transformLexicalToMockNodes(rootChildren);
  const existingIds = new Set<string>();
  const toc: TocItem[] = [];

  // Recursive function to extract TOC and mutate nodes with IDs
  const extractTocAndAssignIds = (nodes: MockContentNode[]) => {
    for (const node of nodes) {
      if (node.type === 'heading-2' || node.type === 'heading-3') {
        const getText = (children: MockContentNode[] = []): string => {
          return children.map((n) => (n.type === 'text' ? (n.text || '') : getText(n.children || []))).join('');
        };
        const text = getText(node.children);
        const id = generateStableId(text, existingIds);
        node.id = id; // Assign ID to the node so RichText can render it
        toc.push({
          id,
          title: text || 'Section',
          level: node.type === 'heading-2' ? 2 : 3,
        });
      } else if (node.children) {
        extractTocAndAssignIds(node.children);
      }
    }
  };

  extractTocAndAssignIds(parsedContent);

  const relatedArticles = (post.relatedArticles || []).flatMap((rel) => {
    if (typeof rel === 'object' && rel !== null && 'title' in rel) {
      const relCat = isCategory(rel.category) ? rel.category.name : 'Uncategorized';
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
    toc: toc,
    content: parsedContent,
    aboutAuthor: {
      ...author,
    },
    relatedArticles: relatedArticles,
    quote: null,
    keyTakeaways: null,
    inlineCTA: null,
    footerCTA: null,
    watchLearn: null,
    faqs: null,
  };
}

export function mapBlogList(posts: Blog[] | undefined): UI_Blog[] {
  if (!posts || posts.length === 0) {
    return [];
  }

  return posts.map(post => {
    const author = isUser(post.author)
      ? {
          id: post.author.id.toString(),
          name: post.author.name,
          role: post.author.designation || post.author.role || 'Author',
          bio: post.author.bio || '',
          avatarUrl: isMedia(post.author.avatar) ? post.author.avatar.url || '' : '',
        }
      : {
          id: 'anon',
          name: 'Anonymous',
          role: 'Author',
          bio: '',
          avatarUrl: '',
        };

    const category: UI_Category = isCategory(post.category)
      ? {
          id: post.category.id.toString(),
          title: post.category.name,
          slug: post.category.slug || '',
        }
      : { id: 'uncategorized', title: 'Uncategorized', slug: 'uncategorized' };

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

export function mapCategoryList(categories: Category[] | undefined): UI_Category[] {
  if (!categories || categories.length === 0) {
    return [];
  }

  return categories.map(cat => ({
    id: cat.id.toString(),
    title: cat.name,
    slug: cat.slug || '',
  }));
}
