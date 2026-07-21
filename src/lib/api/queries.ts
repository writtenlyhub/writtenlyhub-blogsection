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
