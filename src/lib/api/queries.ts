import { getPayloadClient } from './payload'
import type { Blog, Category } from '../../payload-types' // Generated types
import type { ArticleCard } from '@/types/blog'
import { getMediaUrl, isCategory, isMedia } from '../utils/blogMapper'
import { draftMode } from 'next/headers'

export const getPosts = async (
  limit: number = 10,
  page: number = 1,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {};
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  whereOptions.contentType = { equals: contentType };

  return await payload.find({
    collection: 'blogs',
    depth: 1,
    limit,
    page,
    where: whereOptions,
    sort: '-publishedAt',
    select: {
      title: true,
      excerpt: true,
      slug: true,
      category: true,
      author: true,
      publishedAt: true,
      updatedAt: true,
      readTime: true,
      featuredImage: true,
      featuredHero: true,
      contentType: true,
    },
    draft,
    overrideAccess: draft,
  })
}

export const getArchivePosts = async (
  limit: number = 9,
  page: number = 1,
  categorySlug?: string,
  searchQuery?: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()
  
  let categoryId = null;
  if (categorySlug && categorySlug !== 'all') {
    const cats = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1
    });
    if (cats.docs.length > 0) {
      categoryId = cats.docs[0].id;
    } else {
      // Category slug was explicitly requested but does not exist in taxonomy.
      // Return empty docs rather than ignoring the filter.
      return {
        docs: [],
        totalDocs: 0,
        limit,
        totalPages: 0,
        page,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      };
    }
  }

  const whereOptions: any = {};
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  if (contentType !== 'all') {
    whereOptions.contentType = { equals: contentType };
  }

  if (categoryId) {
    whereOptions.category = { equals: categoryId };
  }

  if (searchQuery) {
    whereOptions.searchDocument = { like: searchQuery.toLowerCase().trim() };
  }

  return await payload.find({
    collection: 'blogs',
    depth: 1,
    limit,
    page,
    where: whereOptions,
    sort: '-publishedAt',
    select: {
      title: true,
      excerpt: true,
      slug: true,
      category: true,
      author: true,
      publishedAt: true,
      updatedAt: true,
      readTime: true,
      featuredImage: true,
      featuredHero: true,
      contentType: true,
    },
    draft,
    overrideAccess: draft,
  })
}

export const getPostBySlug = async (
  slug: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
): Promise<Blog | null> => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {
    slug: { equals: slug },
  };
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  whereOptions.contentType = { equals: contentType };

  const result = await payload.find({
    collection: 'blogs',
    depth: 2,
    where: whereOptions,
    limit: 1,
    draft,
    overrideAccess: draft,
  })
  return result.docs[0] || null
}

export const getTopBlogCategories = async (
  limit: number = 4,
  contentType: 'blog' | 'news' = 'blog',
) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {
    contentType: { equals: contentType },
    _status: { equals: 'published' },
  }

  const posts = await payload.find({
    collection: 'blogs',
    depth: 0,
    limit: 1000,
    where: whereOptions,
    select: {
      category: true,
    },
    draft,
    overrideAccess: draft,
  })

  const counts = new Map<number, number>()

  for (const post of posts.docs) {
    const category = post.category
    const categoryId =
      typeof category === 'number'
        ? category
        : category && typeof category === 'object'
          ? category.id
          : null

    if (categoryId) {
      counts.set(categoryId, (counts.get(categoryId) || 0) + 1)
    }
  }

  const categories = await getCategories()

  return categories.docs
    .filter((category) => counts.has(category.id))
    .sort((a, b) => (counts.get(b.id) || 0) - (counts.get(a.id) || 0))
    .slice(0, limit)
}

export const getCategories = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
  })
}

export const getSiteSettings = async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
  } catch (error) {
    console.warn('⚠️ Could not fetch site-settings (using defaults):', (error as Error)?.message || error)
    return { contactEmail: 'hello@writtenlyhub.com' } as any
  }
}

export const getHomepageSettings = async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
      slug: 'homepage-settings',
      depth: 2,
    })
  } catch (error) {
    console.warn('⚠️ Could not fetch homepage-settings (using defaults):', (error as Error)?.message || error)
    return {} as any
  }
}

export const getAdjacentPosts = async (
  publishedAt: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()
  
  const prevWhere: any = [
    { publishedAt: { less_than: publishedAt } },
    { contentType: { equals: contentType } },
  ];
  const nextWhere: any = [
    { publishedAt: { greater_than: publishedAt } },
    { contentType: { equals: contentType } },
  ];
  
  if (!draft) {
    prevWhere.push({ _status: { equals: 'published' } });
    nextWhere.push({ _status: { equals: 'published' } });
  }

  const [prev, next] = await Promise.all([
    // Previous (older)
    payload.find({
      collection: 'blogs',
      where: { and: prevWhere },
      sort: '-publishedAt',
      limit: 1,
      depth: 0,
      select: { title: true, slug: true, publishedAt: true, _status: true },
      draft,
      overrideAccess: draft,
    }),
    // Next (newer)
    payload.find({
      collection: 'blogs',
      where: { and: nextWhere },
      sort: 'publishedAt',
      limit: 1,
      depth: 0,
      select: { title: true, slug: true, publishedAt: true, _status: true },
      draft,
      overrideAccess: draft,
    })
  ])
  
  return {
    prev: prev.docs[0] || null,
    next: next.docs[0] || null,
  }
}

export const getSuccessStories = async (limit: number = 9, page: number = 1, categorySlug?: string) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()
  
  let categoryId = null;
  if (categorySlug && categorySlug !== 'all') {
    const cats = await payload.find({
      collection: 'success-story-categories',
      where: { slug: { equals: categorySlug } },
      limit: 1
    });
    if (cats.docs.length > 0) {
      categoryId = cats.docs[0].id;
    }
  }

  const whereOptions: any = {};
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  if (categoryId) {
    whereOptions.category = { equals: categoryId };
  }

  return await payload.find({
    collection: 'success-stories',
    depth: 1,
    limit,
    page,
    where: whereOptions,
    sort: '-publishedDate',
    draft,
    overrideAccess: draft,
  })
}

export const getSuccessStoryBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {
    slug: { equals: slug },
  };
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  const result = await payload.find({
    collection: 'success-stories',
    depth: 2,
    where: whereOptions,
    limit: 1,
    draft,
    overrideAccess: draft,
  })
  return result.docs[0] || null
}

export const getSuccessStoryCategories = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'success-story-categories',
    depth: 1,
    limit: 100,
  })
}

export interface RelatedPostsData {
  title: string;
  moreText: string;
  moreLink: string;
  articles: ArticleCard[];
  isFallback: boolean;
}

export const getRelatedPosts = async ({
  currentPostId,
  category,
  contentType = 'blog',
  limit = 2,
}: {
  currentPostId: number | string;
  category?: number | Category | (number | Category)[] | null;
  contentType?: 'blog' | 'news';
  limit?: number;
}): Promise<RelatedPostsData> => {
  const payload = await getPayloadClient();
  const { isEnabled: draft } = await draftMode();

  // 1. Resolve Primary Category
  let categoryDoc: Category | null = null;
  const primaryCategory = Array.isArray(category) ? category[0] : category;

  if (primaryCategory) {
    if (typeof primaryCategory === 'object' && 'id' in primaryCategory && primaryCategory.name) {
      categoryDoc = primaryCategory as Category;
    } else if (
      typeof primaryCategory === 'number' || 
      (typeof primaryCategory === 'string' && !isNaN(Number(primaryCategory)))
    ) {
      categoryDoc = await payload.findByID({
        collection: 'categories',
        id: Number(primaryCategory),
        depth: 0,
      }).catch(() => null);
    }
  }

  const mapPostToArticleCard = (doc: any): ArticleCard => {
    const docCatName = isCategory(doc.category)
      ? doc.category.name
      : (categoryDoc?.name || 'Uncategorized');

    const docImg = isMedia(doc.featuredImage)
      ? getMediaUrl(doc.featuredImage.url)
      : '';
    const docImgWidth = isMedia(doc.featuredImage) && typeof doc.featuredImage.width === 'number'
      ? doc.featuredImage.width
      : null;
    const docImgHeight = isMedia(doc.featuredImage) && typeof doc.featuredImage.height === 'number'
      ? doc.featuredImage.height
      : null;

    return {
      title: doc.title || '',
      summary: doc.excerpt || '',
      category: docCatName,
      date: (doc.updatedAt || doc.publishedAt)
        ? new Date(doc.updatedAt || doc.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      readTime: doc.readTime || '5 min read',
      imageUrl: docImg,
      link: `/${doc.contentType || contentType}/${doc.slug}`,
      imageWidth: docImgWidth,
      imageHeight: docImgHeight,
    };
  };

  // 2. Query published posts in the SAME category & SAME contentType, excluding current post
  if (categoryDoc && categoryDoc.id) {
    const categoryWhere: any = {
      contentType: { equals: contentType },
      category: { equals: categoryDoc.id },
      id: { not_equals: currentPostId },
    };
    if (!draft) {
      categoryWhere._status = { equals: 'published' };
    }

    const matchingPosts = await payload.find({
      collection: 'blogs',
      where: categoryWhere,
      sort: '-publishedAt',
      limit,
      depth: 1,
      draft,
      overrideAccess: draft,
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        category: true,
        publishedAt: true,
        updatedAt: true,
        readTime: true,
        featuredImage: true,
        contentType: true,
      },
    });

    if (matchingPosts.docs.length > 0) {
      return {
        title: 'You might also like',
        moreText: `More from ${categoryDoc.name}`,
        moreLink: `/${contentType}?category=${categoryDoc.slug || ''}`,
        articles: matchingPosts.docs.map(mapPostToArticleCard),
        isFallback: false,
      };
    }
  }

  // 3. Fallback: No matching category posts found or article is uncategorized.
  // Query published posts from the SAME contentType (never mix blogs and news), excluding current post
  const fallbackWhere: any = {
    contentType: { equals: contentType },
    id: { not_equals: currentPostId },
  };
  if (!draft) {
    fallbackWhere._status = { equals: 'published' };
  }

  const fallbackPosts = await payload.find({
    collection: 'blogs',
    where: fallbackWhere,
    sort: '-publishedAt',
    limit,
    depth: 1,
    draft,
    overrideAccess: draft,
    select: {
      id: true,
      title: true,
      excerpt: true,
      slug: true,
      category: true,
      publishedAt: true,
      updatedAt: true,
      readTime: true,
      featuredImage: true,
      contentType: true,
    },
  });

  return {
    title: 'You might also like',
    moreText: contentType === 'news' ? 'More from News' : 'More from our Blog',
    moreLink: `/${contentType}`,
    articles: fallbackPosts.docs.map(mapPostToArticleCard),
    isFallback: true,
  };
};


