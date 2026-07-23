import { getPayloadClient } from './payload'
import type { Blog } from '../../payload-types' // Generated types
import { draftMode } from 'next/headers'

export const getPosts = async (limit: number = 10, page: number = 1) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {};
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

  return await payload.find({
    collection: 'blogs',
    depth: 2,
    limit,
    page,
    where: whereOptions,
    sort: '-publishedAt',
    draft,
    overrideAccess: draft,
  })
}

export const getArchivePosts = async (limit: number = 9, page: number = 1, categorySlug?: string, searchQuery?: string) => {
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

  if (categoryId) {
    whereOptions.category = { equals: categoryId };
  }

  if (searchQuery) {
    whereOptions.title = { contains: searchQuery };
  }

  return await payload.find({
    collection: 'blogs',
    depth: 2,
    limit,
    page,
    where: whereOptions,
    sort: '-publishedAt',
    draft,
    overrideAccess: draft,
  })
}

export const getPostBySlug = async (slug: string): Promise<Blog | null> => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()

  const whereOptions: any = {
    slug: { equals: slug },
  };
  if (!draft) {
    whereOptions._status = { equals: 'published' };
  }

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

export const getAdjacentPosts = async (publishedAt: string) => {
  const payload = await getPayloadClient()
  const { isEnabled: draft } = await draftMode()
  
  const prevWhere: any = [ { publishedAt: { less_than: publishedAt } } ];
  const nextWhere: any = [ { publishedAt: { greater_than: publishedAt } } ];
  
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
      draft,
      overrideAccess: draft,
    })
  ])
  
  return {
    prev: prev.docs[0] || null,
    next: next.docs[0] || null,
  }
}
