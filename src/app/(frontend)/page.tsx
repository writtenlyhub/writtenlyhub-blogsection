import { MOCK_BLOGS, CATEGORIES } from '@/data/mockBlogs';
import { SearchBar } from '@/components/ui/SearchBar';
import { HeroCard } from '@/components/blog/HeroCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/ui/Newsletter';

export default function BlogListingPage() {
  const heroBlog = MOCK_BLOGS.find(b => b.featuredHero) || MOCK_BLOGS[0];
  const latestBlogs = MOCK_BLOGS.filter(b => !b.featuredHero).slice(0, 3);
  const aiBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'ai-tech' && !b.featuredHero).slice(0, 3);
  const seoBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'seo' && !b.featuredHero).slice(0, 3);
  const contentMarketingBlogs = MOCK_BLOGS.filter(b => b.category.slug === 'content-marketing' && !b.featuredHero).slice(0, 3);

  return (
    <>
      <section className="w-full px-margin-mobile md:px-gutter pt-16 max-w-5xl mx-auto flex flex-col items-center text-center pb-4">
        <div className="flex items-center gap-2 mb-stack-md">
          <div className="flex items-center justify-center gap-4 mb-stack-md">
            <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-writtenly-navy">Blogs at WrittenlyHub</h1>
            <img alt="WrittenlyHub Logo" className="w-20 h-20 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd11M-PIY0x4_CsAYjgOoY8E3ySIOZ-3WGWMG53h59gkznyNLht4LnMBGIrXY5yENbFaVUE8PiGACLO4Q3030pRdMWCKtZ6mRVJl23TiUW2eG2iPe4P8_7kvqVIqSZ4-LD0DpdEF2di0y71kvr9Kd-X0clt8_vp6dCXxVxg7N9Tw5pToq8PUcbpkdMnunkTwRXyHnFDVNQTnmhXeJYyeeikvoR15Ec4AWWfNYXiKnQKJfNmcYESphzYrvEZhDakvRXBNRVVKfiJXg"/>
          </div>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-12 mx-auto leading-relaxed">
          Explore insightful articles, expert guides, SEO strategies, AI updates and content marketing resources.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-2.5 w-full mb-8">
          <button className="px-4 py-1.5 rounded-full bg-writtenly-orange text-white border border-writtenly-orange font-label-md text-label-md transition-all shadow-sm hover:opacity-90">All</button>
          {CATEGORIES.slice(0, 11).map(cat => (
            <button key={cat.id} className="px-4 py-1.5 rounded-full bg-white text-on-surface-variant border border-outline-variant hover:border-writtenly-orange hover:text-writtenly-orange font-label-md text-label-md transition-all shadow-sm">
              {cat.title}
            </button>
          ))}
        </div>
        
        <div className="w-full max-w-xl mx-auto mt-4">
          <SearchBar />
        </div>
      </section>

      <HeroCard blog={heroBlog} />

      <section className="w-full px-margin-mobile md:px-gutter py-10 max-w-container-max mx-auto">
        <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-writtenly-navy mb-8">
            Latest Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-outline-variant/50 max-w-container-max mx-auto px-margin-mobile md:px-gutter my-4"></div>

      <section className="w-full px-margin-mobile md:px-gutter py-10 max-w-container-max mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-writtenly-navy">
            AI & Tech
          </h3>
          <a className="text-secondary-container font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold" href="#">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-outline-variant/50 max-w-container-max mx-auto px-margin-mobile md:px-gutter my-4"></div>

      <section className="w-full px-margin-mobile md:px-gutter py-10 max-w-container-max mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-writtenly-navy">
            SEO
          </h3>
          <a className="text-secondary-container font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold" href="#">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-outline-variant/50 max-w-container-max mx-auto px-margin-mobile md:px-gutter my-4"></div>

      <section className="w-full px-margin-mobile md:px-gutter py-10 max-w-container-max mx-auto mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-writtenly-navy">
            Content Marketing
          </h3>
          <a className="text-secondary-container font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all font-bold" href="#">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentMarketingBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
