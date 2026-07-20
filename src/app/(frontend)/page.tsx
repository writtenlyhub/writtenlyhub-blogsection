import { MOCK_BLOGS, CATEGORIES } from '@/data/mockBlogs';
import { SearchBar } from '@/components/ui/SearchBar';
import { HeroCard } from '@/components/blog/HeroCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/ui/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';

export default function BlogListingPage() {
  const heroBlog = MOCK_BLOGS.find(b => b.featuredHero) || MOCK_BLOGS[0];
  const latestBlogs = MOCK_BLOGS.filter(b => !b.featuredHero).slice(0, 3);
  const aiBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'ai-tech' && !b.featuredHero).slice(0, 3);
  const seoBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'seo' && !b.featuredHero).slice(0, 3);
  const contentMarketingBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'content-marketing' && !b.featuredHero).slice(0, 3);

  return (
    <>
      {/* Unified Hero Section with soft editorial background */}
      <div className="relative w-full overflow-hidden pb-8 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-transparent pointer-events-none -z-10" />
        
        <section className="w-full px-gutter pt-12 md:pt-16 max-w-container-max mx-auto flex flex-col items-center text-center pb-4 md:pb-6 relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-5">
              <img alt="WrittenlyHub Accent" className="hidden min-[375px]:block w-12 h-12 md:w-20 md:h-20 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd11M-PIY0x4_CsAYjgOoY8E3ySIOZ-3WGWMG53h59gkznyNLht4LnMBGIrXY5yENbFaVUE8PiGACLO4Q3030pRdMWCKtZ6mRVJl23TiUW2eG2iPe4P8_7kvqVIqSZ4-LD0DpdEF2di0y71kvr9Kd-X0clt8_vp6dCXxVxg7N9Tw5pToq8PUcbpkdMnunkTwRXyHnFDVNQTnmhXeJYyeeikvoR15Ec4AWWfNYXiKnQKJfNmcYESphzYrvEZhDakvRXBNRVVKfiJXg"/>
              <h1 className="font-display-lg text-display-lg text-writtenly-navy tracking-tight leading-tight">Blogs at WrittenlyHub</h1>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-2xl mx-auto leading-[1.6] mb-8 md:mb-10">
              Explore insightful articles, expert guides, SEO strategies, AI updates and content marketing resources.
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.1}>
            {/* Tighter Category Pills */}
            <div className="flex md:flex-wrap items-center justify-center gap-2 md:gap-3 w-full mb-6 md:mb-8 overflow-x-auto md:overflow-visible pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <button className="px-5 py-2 rounded-full bg-writtenly-navy text-white font-label-md text-label-md font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px] shrink-0 min-h-[40px] md:min-h-[44px]">All</button>
              {CATEGORIES.slice(0, 8).map(cat => (
                <button key={cat.id} className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-writtenly-navy/50 hover:text-writtenly-navy font-label-md text-label-md transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px] shrink-0 min-h-[40px] md:min-h-[44px]">
                  {cat.title}
                </button>
              ))}
            </div>
            
            {/* Integrated Search Bar spanning full container width */}
            <div className="w-full mx-auto max-w-container-max">
              <SearchBar />
            </div>
          </FadeIn>
        </section>

        <FadeIn direction="up" delay={0.15}>
          <HeroCard blog={heroBlog} />
        </FadeIn>
      </div>

      <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
          <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
            Latest Articles
          </h3>
        </div>
        <FadeIn direction="up">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 xl:gap-8">
            {latestBlogs.map((blog, index) => (
              <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                <BlogCard blog={blog} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto bg-surface-container-low/30 rounded-[2rem] md:rounded-3xl mb-12">
        <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
          <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
            AI & Tech
          </h3>
          <a className="text-writtenly-orange font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold group" href="#">
            View All <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
        <FadeIn direction="up">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 xl:gap-8">
            {aiBlogs.map((blog, index) => (
              <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                <BlogCard blog={blog} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
          <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
            SEO
          </h3>
          <a className="text-writtenly-orange font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold group" href="#">
            View All <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
        <FadeIn direction="up">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 xl:gap-8">
            {seoBlogs.map((blog, index) => (
              <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                <BlogCard blog={blog} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto mb-16 bg-surface-container-low/30 rounded-[2rem] md:rounded-3xl">
        <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-outline-variant/30 pb-4">
          <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight">
            Content Marketing
          </h3>
          <a className="text-writtenly-orange font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold group" href="#">
            View All <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
        <FadeIn direction="up">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 xl:gap-8">
            {contentMarketingBlogs.map((blog, index) => (
              <FadeIn key={blog.id} delay={index * 0.1} direction="up">
                <BlogCard blog={blog} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <FadeIn direction="up">
        <Newsletter />
      </FadeIn>
    </>
  );
}
