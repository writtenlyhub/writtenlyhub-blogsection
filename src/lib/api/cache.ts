import { unstable_cache } from 'next/cache'
import { getPosts, getPostBySlug, getCategories, getSiteSettings } from './queries'

export const getCachedPosts = unstable_cache(
  async (limit?: number, page?: number) => getPosts(limit, page),
  ['posts-list'],
  { revalidate: 3600, tags: ['blogs'] }
)

export const getCachedPostBySlug = unstable_cache(
  async (slug: string) => getPostBySlug(slug),
  ['post-by-slug'],
  { revalidate: 3600, tags: ['blogs'] }
)

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
