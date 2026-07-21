import { unstable_cache } from 'next/cache'
import { getPosts, getPostBySlug, getCategories, getSiteSettings } from './queries'

export const getCachedPosts = async (limit?: number, page?: number) => {
  const cached = unstable_cache(
    async () => getPosts(limit, page),
    ['posts-list', String(limit), String(page)],
    { revalidate: 3600, tags: ['blogs'] }
  )
  return cached()
}

export const getCachedPostBySlug = async (slug: string) => {
  const cached = unstable_cache(
    async () => getPostBySlug(slug),
    ['post-by-slug', slug],
    { revalidate: 3600, tags: ['blogs', `blog-${slug}`] }
  )
  return cached()
}

export const getCachedAdjacentPosts = async (publishedAt: string) => {
  const { getAdjacentPosts } = await import('./queries')
  const cached = unstable_cache(
    async () => getAdjacentPosts(publishedAt),
    ['adjacent-posts', publishedAt],
    { revalidate: 3600, tags: ['blogs'] }
  )
  return cached()
}

export const getCachedCategories = unstable_cache(
  async () => getCategories(),
  ['categories-list'],
  { revalidate: 86400, tags: ['categories'] }
)

export const getCachedSiteSettings = unstable_cache(
  async () => getSiteSettings(),
  ['site-settings'],
  { revalidate: 86400, tags: ['site-settings'] }
)
