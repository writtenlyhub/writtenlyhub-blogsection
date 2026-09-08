import React from 'react';
import type { Metadata } from 'next';
import { SearchBar } from '@/components/ui/SearchBar';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/ui/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { getCachedArchivePosts, getCachedCategories } from '@/lib/api';
import { mapBlogList, mapCategoryList } from '@/lib/utils/blogMapper';
import Link from 'next/link';
import { HomepageJsonLd } from '@/components/seo/HomepageJsonLd';
import { SearchX } from 'lucide-react';
import { Pagination } from '@/components/ui/Pagination';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

export const metadata: Metadata = {
  title: 'WrittenlyHub News - Latest Updates & Announcements',
  description:
    'Stay up-to-date with the latest company news, feature releases, and announcements from WrittenlyHub.',
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    title: 'WrittenlyHub News - Latest Updates & Announcements',
    description:
      'Stay up-to-date with the latest company news, feature releases, and announcements from WrittenlyHub.',
    url: `${SITE_URL}/news`,
    siteName: 'WrittenlyHub',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og/default-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'WrittenlyHub News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WrittenlyHub News - Latest Updates & Announcements',
    description:
      'Stay up-to-date with the latest company news, feature releases, and announcements from WrittenlyHub.',
    images: [`${SITE_URL}/images/og/default-og.jpg`],
  },
};

interface BlogListingPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function NewsListingPage({ searchParams }: BlogListingPageProps) {
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
    <main className="w-full px-gutter max-w-container-max mx-auto pb-section-gap">
      <HomepageJsonLd />
      
      {/* Two-Column Hero Section with Premium Polish */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Top-left ambient glow */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-writtenly-orange/[0.03] blur-[100px]" />
          {/* Subtle grid/dot pattern or abstract shape */}
          <div className="absolute top-[25%] right-[45%] w-1.5 h-1.5 rounded-full bg-writtenly-orange/40" />
          <div className="absolute bottom-[20%] left-[30%] w-1 h-1 rounded-full bg-writtenly-navy/20" />
          {/* Abstract line accent */}
          <svg className="absolute top-[15%] left-[5%] w-24 h-24 text-writtenly-orange/10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          {/* Left Column */}
          <div className="flex-1 lg:w-[35%] flex flex-col justify-center pt-8">
            <h1 className="text-5xl sm:text-6xl md:text-[64px] lg:text-[72px] font-bold tracking-tight leading-[1.05] flex flex-col gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-writtenly-orange to-[#cc4604] pb-2 -mb-2">WrittenlyHub</span>
              <span className="text-writtenly-navy">News</span>
            </h1>
          </div>
          
          {/* Right Column */}
          <div className="flex-1 lg:w-[65%] flex flex-col justify-start max-w-[750px] pt-2">
            <h2 className="font-headline-md text-xl md:text-2xl lg:text-[24px] font-bold text-writtenly-navy leading-[1.45] mb-8 pr-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              The latest news, updates, and announcements from WrittenlyHub.
            </h2>
            
            <p className="font-body-md text-base md:text-lg lg:text-[17px] text-on-surface-variant/90 leading-relaxed mb-12 max-w-[600px] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              Stay up-to-date with our company milestones, new feature releases, team updates, and industry insights.
            </p>
            

        </div>
        </div>
      </section>

      {/* 3-Column Blog Portfolio Grid */}
      <section className="pb-16 pt-8 min-h-[40vh]">

        {BLOGS.length > 0 ? (
          <FadeIn direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:px-12 xl:px-16">
              {BLOGS.map((blog, index) => (
                <React.Fragment key={blog.id}>
                  <FadeIn delay={index * 0.1} direction="up" className="h-full">
                    <BlogCard blog={blog} />
                  </FadeIn>
                  {/* Insert CTA Banner between stories (after the 6th story, or at the end if fewer than 6) */}
                  {(index === 5 || (BLOGS.length <= 6 && index === BLOGS.length - 1)) && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 pb-8">
                        <div className="bg-writtenly-navy rounded-[32px] border border-border-subtle ambient-shadow p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                          
                          {/* Subtle background glow for the banner */}
                          <div className="absolute inset-0 bg-gradient-to-b from-writtenly-orange/10 to-transparent pointer-events-none"></div>

                          <div className="max-w-2xl relative z-10 flex flex-col items-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                              Ready to achieve similar results for your brand?
                            </h3>
                            <p className="font-body-md text-white/80 text-base mb-8 max-w-xl mx-auto">
                              Let's build an authoritative content ecosystem that drives qualified traffic, buyer trust, and measurable revenue.
                            </p>
                            
                            {/* Ultra Premium Button with Avatars */}
                            <Link 
                              href="/contact" 
                              className="relative flex items-center justify-between pl-6 pr-1.5 py-1.5 bg-gradient-to-br from-[#f8651c] to-[#e65005] shadow-[0_8px_20px_-6px_rgba(230,80,5,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(230,80,5,0.7)] border border-white/20 rounded-full group transition-all duration-300 transform hover:-translate-y-1 w-max"
                            >
                              <span className="font-label-md text-[12px] uppercase tracking-[0.15em] font-bold text-white ml-2 mr-5 whitespace-nowrap">LET'S TALK</span>
                              
                              <div className="flex -space-x-2.5 bg-white/15 rounded-full p-1 backdrop-blur-sm shadow-inner transition-transform group-hover:scale-105">
                                <img src="/images/authors/alex.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-30" />
                                <img src="/images/authors/elena.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-20" />
                                <img src="/images/authors/david.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm relative z-10" />
                                <div className="w-7 h-7 rounded-full border border-white/60 bg-white/20 flex items-center justify-center backdrop-blur-md shadow-sm relative z-0 group-hover:bg-white group-hover:text-[#e65005] transition-colors">
                                  <svg className="w-3.5 h-3.5 text-white group-hover:text-[#e65005] transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {!searchQuery && rawPosts.totalPages > 1 && (
              <Pagination totalPages={rawPosts.totalPages} currentPage={rawPosts.page || 1} basePath="/news" />
            )}
          </FadeIn>
        ) : (
          <FadeIn direction="up" className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
              <SearchX className="text-[32px] text-writtenly-orange" />
            </div>
            <h3 className="font-headline-lg text-writtenly-navy font-bold mb-3">No articles found</h3>
            <p className="text-on-surface-variant max-w-md mx-auto mb-8">
              We couldn't find any articles matching "{searchQuery}". Try checking your spelling, using fewer words, or clearing your filters.
            </p>
            <Link href="/news" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
              Clear Search & Filters
            </Link>
          </FadeIn>
        )}
      </section>

      <FadeIn direction="up">
        <Newsletter />
      </FadeIn>
    </main>
  );
}
