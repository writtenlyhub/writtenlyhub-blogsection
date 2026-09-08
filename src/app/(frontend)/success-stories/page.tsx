import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/SearchBar';
import { SuccessStoryCard } from '@/components/SuccessStories/SuccessStoryCard';
import { SuccessStoryCategoryFilter } from '@/components/SuccessStories/SuccessStoryCategoryFilter';
import { Pagination } from '@/components/ui/Pagination';
import { getCachedSuccessStories, getCachedSuccessStoryCategories } from '@/lib/api/cache';
import { getSuccessStories } from '@/lib/api/queries';
import { SearchX, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

interface SuccessStoriesArchivePageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SuccessStoriesArchivePageProps): Promise<Metadata> {
  const { q, page, category } = await searchParams;
  const isSearchPage = Boolean(q);
  const isCategoryPage = Boolean(category && category !== 'all');
  const currentPage = parseInt(page || '1', 10);
  
  let archiveUrl = `${SITE_URL}/success-stories`;
  if (isCategoryPage) {
    archiveUrl = `${SITE_URL}/success-stories?category=${category}`;
  }
  
  const canonicalUrl = currentPage > 1 ? `${archiveUrl}${isCategoryPage ? '&' : '?'}page=${currentPage}` : archiveUrl;

  return {
    title: isSearchPage
      ? `Search results for "${q}" | Our Work | WrittenlyHub`
      : 'Our Work | WrittenlyHub',
    description:
      'Explore our portfolio of client success stories where we showcase strategic content execution and digital authority.',
    alternates: {
      canonical: isSearchPage ? undefined : canonicalUrl,
    },
    openGraph: {
      title: 'Our Work | WrittenlyHub',
      description:
        'Explore our portfolio of client success stories where we showcase strategic content execution and digital authority.',
      url: canonicalUrl,
      siteName: 'WrittenlyHub',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/og/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'WrittenlyHub Success Stories',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Work | WrittenlyHub',
      description:
        'Explore our portfolio of client success stories where we showcase strategic content execution and digital authority.',
      images: [`${SITE_URL}/images/og/default-og.jpg`],
    },
    ...(isSearchPage ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function SuccessStoriesArchivePage({ searchParams }: SuccessStoriesArchivePageProps) {
  const { page, category, q } = await searchParams;
  
  const currentPage = parseInt(page || '1', 10);
  const categorySlug = category || 'all';
  const searchQuery = q || '';

  const [rawStories, rawCategories] = await Promise.all([
    getSuccessStories(12, currentPage, categorySlug),
    getCachedSuccessStoryCategories(),
  ]);

  // Client side filtering for search query if not implemented in API cleanly.
  // The API doesn't filter by searchQuery for Success Stories currently, let's filter it here for now.
  let filteredStories = rawStories.docs;
  if (searchQuery) {
    filteredStories = filteredStories.filter(story => 
      story.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      story.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const CATEGORIES = rawCategories.docs;

  return (
    <main className="w-full px-gutter max-w-container-max mx-auto pb-section-gap">
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
          <div className="flex-1 relative lg:w-[35%] lg:flex-none flex justify-start lg:justify-start animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-6xl sm:text-7xl md:text-[90px] lg:text-[108px] font-bold tracking-tight leading-[0.9] flex flex-col gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-writtenly-orange to-[#cc4604] pb-2 -mb-2">Our</span>
              <span className="text-writtenly-navy">Work</span>
            </h1>
          </div>
          
          {/* Right Column */}
          <div className="flex-1 lg:w-[65%] flex flex-col justify-start max-w-[750px] pt-2">
            <h2 className="font-headline-md text-xl md:text-2xl lg:text-[24px] font-bold text-writtenly-navy leading-[1.45] mb-8 pr-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Crafting high-impact content ecosystems, we deliver measurable growth in organic traffic, engagement, and conversions.
            </h2>
            
            <p className="font-body-md text-base md:text-lg lg:text-[17px] text-on-surface-variant/90 leading-relaxed mb-12 max-w-[600px] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              Explore our portfolio of client success stories where we showcase strategic content execution and digital authority. We act as a growth catalyst for companies looking to establish uncontested category leadership and drive sustainable revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link 
                href="/contact" 
                className="relative flex items-center justify-between pl-6 pr-1.5 py-1.5 bg-gradient-to-br from-[#f8651c] to-[#e65005] shadow-[0_8px_20px_-6px_rgba(230,80,5,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(230,80,5,0.6)] border border-white/20 rounded-full group transition-all duration-300 w-full max-w-[210px] transform hover:-translate-y-0.5"
              >
                <span className="font-label-md text-[11px] sm:text-xs uppercase tracking-[0.15em] font-bold text-white ml-2">LET'S TALK</span>
                
                <div className="flex -space-x-2.5 ml-3 bg-white/15 rounded-full p-1 backdrop-blur-sm shadow-inner">
                  <img src="/images/authors/alex.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm" />
                  <img src="/images/authors/elena.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm" />
                  <img src="/images/authors/marcus.webp" alt="Client" className="w-7 h-7 rounded-full border border-white/60 object-cover shadow-sm" />
                </div>
              </Link>

              <div className="hidden sm:flex items-center gap-3 ml-2">
                <svg className="w-12 h-10 text-[#3b2e5a]/60 -mt-2 transform -rotate-12" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M85 45 C 60 65, 30 55, 10 40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M84 44 C 62 66, 28 54, 11 41" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" className="opacity-60" />
                  <path d="M10 40 C 20 40, 25 30, 28 25 M10 40 C 15 48, 18 55, 20 60" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-['Caveat',_cursive] text-[#3b2e5a] text-[20px] md:text-[24px] tracking-wide whitespace-nowrap mt-1 transform -rotate-2">
                  We get booked fast🔥
                </span>
              </div>
            </div>
        </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-start gap-6">
          <SuccessStoryCategoryFilter categories={CATEGORIES as any} mobileVisibleCount={6} />
        </div>
      </section>

      {/* 3-Column Success Story Portfolio Grid */}
      <section className="pb-16 py-12 min-h-[40vh]">
        {filteredStories.length > 0 ? (
          <FadeIn direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:px-12 xl:px-16">
              {filteredStories.map((story, index) => (
                <React.Fragment key={story.id}>
                  <FadeIn delay={index * 0.1} direction="up" className="h-full">
                    <SuccessStoryCard story={story as any} />
                  </FadeIn>
                  {/* Insert CTA Banner between stories (after the 6th story, or at the end if fewer than 6) */}
                  {(index === 5 || (filteredStories.length <= 6 && index === filteredStories.length - 1)) && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 pb-8">
                      <div className="bg-writtenly-navy rounded-[32px] border border-border-subtle ambient-shadow p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        
                        {/* Subtle background glow for the banner */}
                        <div className="absolute inset-0 bg-gradient-to-b from-writtenly-orange/10 to-transparent pointer-events-none"></div>

                        <div className="max-w-2xl relative z-10 flex flex-col items-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                            Ready to achieve similar results for your brand?
                          </h3>
                          <p className="font-body-md text-white/80 text-base mb-8 max-w-xl mx-auto">
                            Let&apos;s build an authoritative content ecosystem that drives qualified traffic, buyer trust, and measurable revenue.
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
                                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#e65005] transition-colors" />
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
            {/* We could add pagination if needed, relying on rawStories.totalPages */}
            {!searchQuery && rawStories.totalPages > 1 && (
              <Pagination totalPages={rawStories.totalPages} currentPage={rawStories.page || 1} basePath="/success-stories" />
            )}
          </FadeIn>
        ) : (
          <FadeIn direction="up" className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
              <SearchX className="text-[32px] text-writtenly-orange" />
            </div>
            <h3 className="font-headline-lg text-writtenly-navy font-bold mb-3">No stories found</h3>
            <p className="text-on-surface-variant max-w-md mx-auto mb-8">
              We couldn&apos;t find any stories matching your criteria. Try adjusting your search or filters.
            </p>
            <Link href="/success-stories" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
              Clear Search & Filters
            </Link>
          </FadeIn>
        )}
      </section>
    </main>
  );
}
