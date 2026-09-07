import { unstable_cache } from 'next/cache'
import { getPosts, getArchivePosts, getPostBySlug, getCategories, getSiteSettings, getHomepageSettings, getSuccessStories, getSuccessStoryBySlug, getSuccessStoryCategories } from './queries'
import { draftMode } from 'next/headers'

// Safely invoke draftMode() so it doesn't throw during generateStaticParams
async function safeDraftMode() {
  try {
    return await draftMode();
  } catch (error) {
    return { isEnabled: false };
  }
}

export const getCachedPosts = async (limit?: number, page?: number) => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getPosts(limit, page);
  const cached = unstable_cache(
    async () => getPosts(limit, page),
    ['posts-list', String(limit), String(page)],
    { tags: ['blogs'] }
  );
  return cached();
};

export const getCachedArchivePosts = async (limit?: number, page?: number, categorySlug?: string, searchQuery?: string) => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getArchivePosts(limit, page, categorySlug, searchQuery);
  const cached = unstable_cache(
    async () => getArchivePosts(limit, page, categorySlug, searchQuery),
    ['archive-posts', String(limit), String(page), String(categorySlug), String(searchQuery)],
    { tags: ['blogs'] }
  )
  return cached()
}

export const getCachedPostBySlug = async (slug: string) => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getPostBySlug(slug);
  const cached = unstable_cache(
    async () => getPostBySlug(slug),
    ['post-by-slug', slug],
    { tags: ['blogs', `blog-${slug}`] }
  )
  return cached()
}

export const getCachedAdjacentPosts = async (publishedAt: string) => {
  const { getAdjacentPosts } = await import('./queries')
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getAdjacentPosts(publishedAt);
  const cached = unstable_cache(
    async () => getAdjacentPosts(publishedAt),
    ['adjacent-posts', publishedAt],
    { tags: ['blogs'] }
  )
  return cached()
}

export const getCachedCategories = async () => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getCategories();
  const cached = unstable_cache(
    async () => getCategories(),
    ['categories-list'],
    { tags: ['categories'] }
  )
  return cached()
}

export const getCachedSiteSettings = async () => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getSiteSettings();
  const cached = unstable_cache(
    async () => getSiteSettings(),
    ['site-settings'],
    { tags: ['site-settings'] }
  )
  return cached()
}

export const getCachedHomepageSettings = async () => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getHomepageSettings();
  const cached = unstable_cache(
    async () => getHomepageSettings(),
    ['homepage-settings'],
    { tags: ['homepage-settings'] }
  );
  return cached();
};

export const getCachedSuccessStories = async (limit?: number, page?: number, categorySlug?: string) => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getSuccessStories(limit, page, categorySlug);
  const cached = unstable_cache(
    async () => getSuccessStories(limit, page, categorySlug),
    ['success-stories-list-v2', String(limit), String(page), String(categorySlug)],
    { tags: ['success-stories'] }
  );
  return cached();
};

export const getCachedSuccessStoryBySlug = async (slug: string) => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getSuccessStoryBySlug(slug);
  const cached = unstable_cache(
    async () => getSuccessStoryBySlug(slug),
    ['success-story-by-slug', slug],
    { tags: ['success-stories', `success-story-${slug}`] }
  );
  return cached();
};

export const getCachedSuccessStoryCategories = async () => {
  const { isEnabled: draft } = await safeDraftMode();
  if (draft || process.env.NODE_ENV !== 'production') return getSuccessStoryCategories();
  const cached = unstable_cache(
    async () => getSuccessStoryCategories(),
    ['success-story-categories-list'],
    { tags: ['success-story-categories'] }
  );
  return cached();
};
