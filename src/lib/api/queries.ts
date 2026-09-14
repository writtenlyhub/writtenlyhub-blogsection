import { getPayloadClient } from './payload'
import type { Blog } from '../../payload-types' // Generated types
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

export const getTopBlogCategories = async (limit: number = 4) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {
    contentType: { equals: 'blog' },
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
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
}

export const getHomepageSettings = async () => {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'homepage-settings',
    depth: 2,
  })
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

