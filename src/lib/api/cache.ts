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

export const getCachedPosts = async (
  limit?: number,
  page?: number,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const { isEnabled: draft } = await safeDraftMode();

  if (draft || process.env.NODE_ENV !== 'production') {
    return getPosts(limit, page, contentType);
  }

  const cached = unstable_cache(
    async () => getPosts(limit, page, contentType),
    ['posts-list', contentType, String(limit), String(page)],
    { tags: ['blogs', `${contentType}-posts`] }
  );

  return cached();
};

export const getCachedArchivePosts = async (
  limit?: number,
  page?: number,
  categorySlug?: string,
  searchQuery?: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const { isEnabled: draft } = await safeDraftMode();

  if (draft || process.env.NODE_ENV !== 'production') {
    return getArchivePosts(
      limit,
      page,
      categorySlug,
      searchQuery,
      contentType,
    );
  }

  const cached = unstable_cache(
    async () => getArchivePosts(
      limit,
      page,
      categorySlug,
      searchQuery,
      contentType,
    ),
    [
      'archive-posts',
      contentType,
      String(limit),
      String(page),
      String(categorySlug),
      String(searchQuery),
    ],
    { tags: ['blogs', `${contentType}-posts`] }
  );

  return cached();
};

export const getCachedPostBySlug = async (
  slug: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const { isEnabled: draft } = await safeDraftMode();

  if (draft || process.env.NODE_ENV !== 'production') {
    return getPostBySlug(slug, contentType);
  }

  const cached = unstable_cache(
    async () => getPostBySlug(slug, contentType),
    ['post-by-slug', contentType, slug],
    { tags: ['blogs', `${contentType}-${slug}`] }
  );

  return cached();
};

export const getCachedAdjacentPosts = async (
  publishedAt: string,
  contentType: 'blog' | 'news' | 'all' = 'blog',
) => {
  const { getAdjacentPosts } = await import('./queries');
  const { isEnabled: draft } = await safeDraftMode();

  if (draft || process.env.NODE_ENV !== 'production') {
    return getAdjacentPosts(publishedAt, contentType);
  }

  const cached = unstable_cache(
    async () => getAdjacentPosts(publishedAt, contentType),
    ['adjacent-posts', contentType, publishedAt],
    { tags: ['blogs', `${contentType}-posts`] }
  );

  return cached();
};

export const getCachedTopBlogCategories = async (
  limit: number = 4,
  contentType: 'blog' | 'news' = 'blog',
) => {
  const { getTopBlogCategories } = await import('./queries');
  const { isEnabled: draft } = await safeDraftMode();

  if (draft || process.env.NODE_ENV !== 'production') {
    return getTopBlogCategories(limit, contentType);
  }

  const cached = unstable_cache(
    async () => getTopBlogCategories(limit, contentType),
    ['top-blog-categories', contentType, String(limit)],
    { tags: ['blogs', `${contentType}-posts`, 'categories'] }
  );

  return cached();
};

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
