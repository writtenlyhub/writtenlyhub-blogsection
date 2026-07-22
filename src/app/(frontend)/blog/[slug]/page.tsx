import React from 'react';

import { notFound } from 'next/navigation';
import { BlogHero } from '@/components/blog/BlogHero';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { RichText } from '@/components/blog/RichText';
import { AboutAuthor } from '@/components/blog/AboutAuthor';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import Link from 'next/link';
import { mapBlogData, mapBlogList } from '@/lib/utils/blogMapper';
import { getCachedPostBySlug, getCachedArchivePosts, getCachedPosts } from '@/lib/api';
import { SocialShare } from '@/components/blog/SocialShare';


interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const { getCachedPosts } = await import('@/lib/api');
    const posts = await getCachedPosts(100, 1);
    return posts.docs.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch posts for generateStaticParams. Database might be unavailable during build:', error);
    // Fallback to on-demand generation
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
  const { slug } = await params;
  const rawPayloadPost = await getCachedPostBySlug(slug); 
  const blogData = mapBlogData(rawPayloadPost);

  if (!blogData) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blogData.hero.title,
    description: blogData.hero.summary,
    openGraph: {
      title: blogData.hero.title,
      description: blogData.hero.summary,
      type: "article",
      publishedTime: blogData.hero.publishedAt,
      authors: [blogData.hero.author.name],
      images: [
        {
          url: blogData.hero.imageUrl,
          width: 1200,
          height: 630,
          alt: blogData.hero.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blogData.hero.title,
      description: blogData.hero.summary,
      images: [blogData.hero.imageUrl],
    },
  };
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;
  console.log(`[BlogDetail] Resolving slug:`, slug);
  const rawPayloadPost = await getCachedPostBySlug(slug); 
  console.log(`[BlogDetail] getCachedPostBySlug result:`, rawPayloadPost ? 'Found' : 'Null');
  
  let blogData = null;
  try {
    blogData = mapBlogData(rawPayloadPost);
    console.log(`[BlogDetail] mapBlogData result:`, blogData ? 'Success' : 'Null');
  } catch (error) {
    console.error(`[BlogDetail] mapBlogData crashed:`, error);
  }

  if (!rawPayloadPost || !blogData) {
    console.log(`[BlogDetail] Calling notFound() because rawPayloadPost=${!!rawPayloadPost}, blogData=${!!blogData}`);
    notFound();
  }

  const { getCachedAdjacentPosts } = await import('@/lib/api');
  const adjacent = rawPayloadPost.publishedAt ? await getCachedAdjacentPosts(rawPayloadPost.publishedAt) : { prev: null, next: null };

  let finalRelatedArticles = blogData.relatedArticles || [];
  
  if (finalRelatedArticles.length === 0) {
    const categorySlug = rawPayloadPost.category && typeof rawPayloadPost.category === 'object' ? rawPayloadPost.category.slug : undefined;
    
    if (categorySlug) {
      const categoryPosts = await getCachedArchivePosts(4, 1, categorySlug);
      const filteredCatPosts = categoryPosts.docs.filter(p => p.id !== rawPayloadPost.id).slice(0, 3);
      if (filteredCatPosts.length > 0) {
        const mappedList = mapBlogList(filteredCatPosts);
        finalRelatedArticles = mappedList.map(item => ({
          title: item.title,
          summary: item.excerpt,
          category: item.category.title,
          date: item.publishedDate,
          readTime: item.readTime,
          imageUrl: item.featuredImage,
          link: `/blog/${item.slug}`
        }));
      }
    }
    
    if (finalRelatedArticles.length === 0) {
      const latestPosts = await getCachedPosts(4, 1);
      const filteredLatest = latestPosts.docs.filter(p => p.id !== rawPayloadPost.id).slice(0, 3);
      if (filteredLatest.length > 0) {
         const mappedList = mapBlogList(filteredLatest);
         finalRelatedArticles = mappedList.map(item => ({
            title: item.title,
            summary: item.excerpt,
            category: item.category.title,
            date: item.publishedDate,
            readTime: item.readTime,
            imageUrl: item.featuredImage,
            link: `/blog/${item.slug}`
         }));
      }
    }
  }

  return (
    <>
      <ReadingProgress />

      <main className="mt-8 max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">


        <BlogHero {...blogData.hero} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative w-full">
          {/* Desktop Sticky TOC */}
          <div className="hidden lg:block lg:col-span-3 h-full">
            <div className="sticky top-[112px] pb-8 h-fit self-start">
              <TableOfContents items={blogData.toc} isDesktop={true} />
            </div>
          </div>
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 lg:col-start-5 w-full min-w-0">
            {/* Mobile / Tablet TOC */}
            <div className="lg:hidden mb-10 max-w-[75ch] mx-auto">
              <TableOfContents items={blogData.toc} isMobile={true} />
            </div>
            
            <ArticleContent>
              <RichText content={blogData.content} />
            </ArticleContent>
          </div>
        </div>

        {/* Bottom Content Grid (breaks sticky boundary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative pb-section-gap w-full">
          <div className="hidden lg:block lg:col-span-3"></div>
          <div className="lg:col-span-8 lg:col-start-5 w-full min-w-0">
            <div className="mt-24 border-t border-outline-variant pt-12">
              <AboutAuthor data={blogData.aboutAuthor} />
              
              <div className="lg:hidden mt-8">
                <span className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Share this article</span>
                <SocialShare title={blogData.hero.title} layout="horizontal" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-outline-variant py-8 mb-16 mt-8">
                {adjacent.prev ? (
                <Link className="group flex flex-col items-start gap-2 w-full md:w-1/2 text-left hover:bg-surface-container-low p-4 rounded-xl transition-colors no-underline" href={`/blog/${adjacent.prev.slug}`}>
                  <div className="flex items-center gap-2 text-secondary-container font-bold text-sm tracking-wide uppercase">
                    <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Previous Article
                  </div>
                  <h4 className="font-headline-md text-primary text-lg group-hover:text-secondary-container transition-colors line-clamp-2">{adjacent.prev.title}</h4>
                </Link>
              ) : (
                <div className="w-full md:w-1/2" />
              )}
              
              <div className="hidden md:block w-px h-16 bg-outline-variant"></div>
              
              {adjacent.next ? (
                <Link className="group flex flex-col items-end gap-2 w-full md:w-1/2 text-right hover:bg-surface-container-low p-4 rounded-xl transition-colors no-underline" href={`/blog/${adjacent.next.slug}`}>
                  <div className="flex items-center gap-2 text-secondary-container font-bold text-sm tracking-wide uppercase">
                    Next Article
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                  <h4 className="font-headline-md text-primary text-lg group-hover:text-secondary-container transition-colors line-clamp-2">{adjacent.next.title}</h4>
                </Link>
              ) : (
                <div className="w-full md:w-1/2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>

      {finalRelatedArticles.length > 0 && (
        <RelatedArticles data={{ articles: finalRelatedArticles }} />
      )}
    </>
  );
}
