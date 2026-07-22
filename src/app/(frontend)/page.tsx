import { SearchBar } from '@/components/ui/SearchBar';
import { HeroCard } from '@/components/blog/HeroCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/ui/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { getCachedPosts, getCachedCategories, getCachedHomepageSettings } from '@/lib/api';
import { mapBlogList, mapCategoryList } from '@/lib/utils/blogMapper';
import Link from 'next/link';

export default async function BlogListingPage() {
  const [rawPosts, rawCategories, rawSettings] = await Promise.all([
    getCachedPosts(50, 1),
    getCachedCategories(),
    getCachedHomepageSettings(),
  ]);
  
  const MOCK_BLOGS = mapBlogList(rawPosts.docs);
  const CATEGORIES = mapCategoryList(rawCategories.docs);

  const heroBlog = MOCK_BLOGS.find(b => b.featuredHero) || MOCK_BLOGS[0];
  const latestBlogs = MOCK_BLOGS.filter(b => !b.featuredHero).slice(0, 3);
  
  // Safely get curated categories, defaulting to an empty array if not set
  const curatedCategories = Array.isArray(rawSettings.curatedCategories) 
    ? rawSettings.curatedCategories 
    : [];

  return (
    <>
      {/* Unified Hero Section with soft editorial background */}
      <div className="relative w-full overflow-hidden pb-8 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-transparent pointer-events-none -z-10" />
        
        <section className="w-full px-gutter pt-12 md:pt-16 max-w-container-max mx-auto flex flex-col items-center text-center pb-4 md:pb-6 relative z-10">
          <FadeIn direction="up" delay={0}>
            {/* ── Editorial Masthead Lockup ──────────────────────────────
                 Mobile: bird vertically centered to BOTH title lines as one
                 text block. The whole unit is centered on the page.
                 Desktop: classic single-row with bird + full title.
            ───────────────────────────────────────────────────────────── */}
            <h1 className="mb-3 md:mb-5 font-display-lg text-display-lg text-writtenly-navy tracking-tight leading-tight">

              {/* ── Mobile lockup ── */}
              <span className="flex md:hidden justify-center">
                <span className="inline-flex items-center gap-3">
                  <img
                    alt="WrittenlyHub Accent"
                    className="hidden min-[375px]:block w-11 h-11 object-contain shrink-0 self-center"
                    src="/images/logos/bird-accent.png"
                  />
                  <span className="flex flex-col text-left">
                    <span>Blogs at</span>
                    <span>WrittenlyHub</span>
                  </span>
                </span>
              </span>

              {/* ── Desktop lockup ── */}
              <span className="hidden md:flex items-center justify-center gap-4">
                <img
                  alt="WrittenlyHub Accent"
                  className="w-20 h-20 object-contain shrink-0"
                  src="/images/logos/bird-accent.png"
                />
                <span>Blogs at WrittenlyHub</span>
              </span>

            </h1>

            {/* Subtitle — grouped with heading, 16–20px extra clearance before pills */}
            <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-2xl mx-auto leading-[1.6] mb-10 md:mb-10 px-1 md:px-0">
              Explore insightful articles, expert guides, SEO strategies, AI updates and content marketing resources.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1} className="w-full">
            {/* CategoryFilter handles desktop pills + mobile condensed bar + bottom sheet */}
            <CategoryFilter categories={CATEGORIES} mobileVisibleCount={6} />

            {/* Integrated Search Bar spanning full container width */}
            <div className="w-full mx-auto max-w-container-max">
              <SearchBar />
            </div>
          </FadeIn>
        </section>

        {heroBlog && (
          <FadeIn direction="up" delay={0.15}>
            <HeroCard blog={heroBlog} />
          </FadeIn>
        )}
      </div>

      {latestBlogs.length > 0 && (
        <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto">
          <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
            <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
              Latest Articles
            </h3>
          </div>
          <FadeIn direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {latestBlogs.map((blog, index) => (
                <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                  <BlogCard blog={blog} />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Dynamically Rendered Curated Category Sections */}
      {curatedCategories.map((cat: any, i: number) => {
        const categorySlug = typeof cat === 'object' ? cat.slug : cat;
        const categoryTitle = typeof cat === 'object' ? cat.name : cat;
        
        const categoryBlogs = MOCK_BLOGS.filter(
          b => b.category.slug === categorySlug && !b.featuredHero
        ).slice(0, 3);
        
        if (categoryBlogs.length === 0) return null;

        // Alternate background color for visual separation
        const useBackground = i % 2 === 0;

        return (
          <section key={categorySlug} className={`w-full px-gutter py-section-gap max-w-container-max mx-auto ${useBackground ? 'bg-surface-container-low/30 rounded-[2rem] md:rounded-3xl mb-12' : 'mb-16'}`}>
            <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
              <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
                {categoryTitle}
              </h3>
              <Link className="text-writtenly-orange font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold group" href={`/blog?category=${categorySlug}`}>
                View All <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <FadeIn direction="up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {categoryBlogs.map((blog, index) => (
                  <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                    <BlogCard blog={blog} />
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </section>
        );
      })}

      <FadeIn direction="up">
        <Newsletter />
      </FadeIn>
    </>
  );
}
