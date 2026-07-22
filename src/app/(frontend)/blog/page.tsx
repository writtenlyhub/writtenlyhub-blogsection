import React from 'react';
import { Metadata } from 'next';
import { SearchBar } from '@/components/ui/SearchBar';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/ui/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Pagination } from '@/components/ui/Pagination';
import { getCachedArchivePosts, getCachedCategories } from '@/lib/api';
import { mapBlogList, mapCategoryList } from '@/lib/utils/blogMapper';

export const metadata: Metadata = {
  title: "Blog Archive | WrittenlyHub",
  description: "Browse all articles, guides, and resources published on the WrittenlyHub blog.",
};

interface BlogArchivePageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function BlogArchivePage({ searchParams }: BlogArchivePageProps) {
  const { page, category, q } = await searchParams;
  
  const currentPage = parseInt(page || '1', 10);
  const categorySlug = category || 'all';
  const searchQuery = q || '';

  const [rawPosts, rawCategories] = await Promise.all([
    getCachedArchivePosts(9, currentPage, categorySlug, searchQuery),
    getCachedCategories(),
  ]);
  
  const BLOGS = mapBlogList(rawPosts.docs);
  const CATEGORIES = mapCategoryList(rawCategories.docs);

  return (
    <>
      <div className="relative w-full overflow-hidden pb-8 md:pb-12 bg-surface-container-lowest">
        
        <section className="w-full px-gutter pt-12 md:pt-16 max-w-container-max mx-auto flex flex-col items-center text-center pb-4 md:pb-6 relative z-10">
          <FadeIn direction="up" delay={0}>
            <h1 className="mb-3 md:mb-5 font-display-lg text-display-lg text-writtenly-navy tracking-tight leading-tight">
              Blog Archive
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-2xl mx-auto leading-[1.6] mb-10 md:mb-10 px-1 md:px-0">
              Browse all our published articles, filter by topic, or search for specific guides.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1} className="w-full">
            <CategoryFilter categories={CATEGORIES} mobileVisibleCount={6} />
            <div className="w-full mx-auto max-w-container-max">
              <SearchBar />
            </div>
          </FadeIn>
        </section>
      </div>

      <section className="w-full px-gutter py-10 md:py-16 max-w-container-max mx-auto min-h-[40vh]">
        
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/30">
          <h2 className="font-headline-md text-writtenly-navy font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             categorySlug !== 'all' ? `${CATEGORIES.find(c => c.slug === categorySlug)?.title || 'Category'} Articles` : 
             'All Articles'}
          </h2>
          <span className="text-on-surface-variant font-label-md">
            Showing {rawPosts.pagingCounter} - {Math.min(rawPosts.pagingCounter + rawPosts.limit - 1, rawPosts.totalDocs)} of {rawPosts.totalDocs}
          </span>
        </div>

        {BLOGS.length > 0 ? (
          <FadeIn direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {BLOGS.map((blog, index) => (
                <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                  <BlogCard blog={blog} />
                </FadeIn>
              ))}
            </div>
            
            <Pagination totalPages={rawPosts.totalPages} currentPage={rawPosts.page || 1} />
          </FadeIn>
        ) : (
          <FadeIn direction="up" className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px] text-writtenly-orange">search_off</span>
            </div>
            <h3 className="font-headline-lg text-writtenly-navy font-bold mb-3">No articles found</h3>
            <p className="text-on-surface-variant max-w-md mx-auto">
              We couldn't find any articles matching your current filters. Try adjusting your search query or selecting a different category.
            </p>
          </FadeIn>
        )}
      </section>

      <FadeIn direction="up">
        <Newsletter />
      </FadeIn>
    </>
  );
}
