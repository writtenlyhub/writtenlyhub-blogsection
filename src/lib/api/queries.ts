import { getPayloadClient } from './payload'
import type { Blog } from '../../payload-types' // Generated types

export const getPosts = async (limit: number = 10, page: number = 1) => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'blogs',
    depth: 2,
    limit,
    page,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })
}

export const getArchivePosts = async (limit: number = 9, page: number = 1, categorySlug?: string, searchQuery?: string) => {
  const payload = await getPayloadClient()
  
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

  const whereOptions: any = {
    _status: {
      equals: 'published',
    },
  };

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
  })
}

export const getPostBySlug = async (slug: string): Promise<Blog | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blogs',
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
    limit: 1,
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
  
  const [prev, next] = await Promise.all([
    // Previous (older)
    payload.find({
      collection: 'blogs',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { publishedAt: { less_than: publishedAt } }
        ]
      },
      sort: '-publishedAt',
      limit: 1,
      depth: 0,
    }),
    // Next (newer)
    payload.find({
      collection: 'blogs',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { publishedAt: { greater_than: publishedAt } }
        ]
      },
      sort: 'publishedAt',
      limit: 1,
      depth: 0,
    })
  ])
  
  return {
    prev: prev.docs[0] || null,
    next: next.docs[0] || null,
  }
}
