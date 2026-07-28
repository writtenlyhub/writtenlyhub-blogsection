import React from 'react';

import { notFound, permanentRedirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { BlogHero } from '@/components/blog/BlogHero';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { RichText } from '@/components/blog/RichText';
import { AboutAuthor } from '@/components/blog/AboutAuthor';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import Link from 'next/link';
import { mapBlogData, mapBlogList } from '@/lib/utils/blogMapper';
import { getCachedPostBySlug, getCachedArchivePosts, getCachedPosts, getCachedSiteSettings } from '@/lib/api';
import { getPayloadClient } from '@/lib/api/payload';
import { SocialShare } from '@/components/blog/SocialShare';
import { NewsletterPopup } from '@/components/blog/NewsletterPopup';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildJsonLd } from '@/lib/seo/buildJsonLd';
import type { Blog } from '@/payload-types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';


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
  const post = await getCachedPostBySlug(slug);

  if (!post) {
    // Check for redirects
    const { getPayloadClient } = await import('@/lib/api/payload');
    const payload = await getPayloadClient();
    const redirectResult = await payload.find({
      collection: 'blogs',
      where: {
        'previousSlugs.slug': { equals: slug }
      },
      depth: 0,
      limit: 1,
    });
    if (redirectResult.docs.length > 0) {
      const correctSlug = redirectResult.docs[0].slug;
      if (correctSlug && correctSlug !== slug) {
        permanentRedirect(`/blog/${correctSlug}`);
      }
    }
    return { title: 'Blog Not Found' };
  }

  // Fetch global settings
  const siteSettings = await getCachedSiteSettings();

  return buildMetadata({
    post,
    siteSettings,
    slug,
  });
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  console.log(`[BlogDetail] Resolving slug: ${slug} | draftMode: ${isDraftMode}`);

  // When Draft Mode is active, bypass the published-only cache and fetch
  // directly from Payload with overrideAccess so editors can see unpublished posts.
  let rawPayloadPost: Blog | null = null;
  if (isDraftMode) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'blogs',
        where: { slug: { equals: slug } },
        overrideAccess: true,
        draft: true, // Crucial for querying drafts
        depth: 2,
        limit: 1,
      });
      rawPayloadPost = (result.docs[0] as Blog) || null;
      console.log(`[BlogDetail] Payload returned ${result.docs.length} docs. Document _status: ${rawPayloadPost?._status}`);
    } catch (err) {
      console.error('[BlogDetail] Draft Mode Payload fetch failed:', err);
    }
  } else {
    rawPayloadPost = await getCachedPostBySlug(slug);
  }

  console.log(`[BlogDetail] Post fetch result:`, rawPayloadPost ? 'Found' : 'Null');

  let blogData = null;
  try {
    blogData = mapBlogData(rawPayloadPost);
    if (blogData) {
      blogData.hero.isDraft = isDraftMode && rawPayloadPost?._status === 'draft';
    }
    console.log(`[BlogDetail] mapBlogData result:`, blogData ? 'Success' : 'Null');
  } catch (error) {
    console.error(`[BlogDetail] mapBlogData crashed:`, error);
  }

  if (!rawPayloadPost || !blogData) {
    // Check for redirects before returning 404
    if (!isDraftMode) {
      const payload = await getPayloadClient();
      const redirectResult = await payload.find({
        collection: 'blogs',
        where: {
          'previousSlugs.slug': { equals: slug }
        },
        depth: 0,
        limit: 1,
      });
      if (redirectResult.docs.length > 0) {
        const correctSlug = redirectResult.docs[0].slug;
        if (correctSlug && correctSlug !== slug) {
          permanentRedirect(`/blog/${correctSlug}`);
        }
      }
    }
    console.log(`[BlogDetail] Calling notFound() because rawPayloadPost=${!!rawPayloadPost}, blogData=${!!blogData}`);
    notFound();
  }

  const { getCachedAdjacentPosts } = await import('@/lib/api');
  const adjacent = rawPayloadPost.publishedAt ? await getCachedAdjacentPosts(rawPayloadPost.publishedAt) : { prev: null, next: null };

  const siteSettings = await getCachedSiteSettings();
  const newsletterPopupData = siteSettings?.newsletterPopup || undefined;

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

  const jsonLdSchemas = buildJsonLd({
    post: rawPayloadPost,
    siteSettings,
    slug: rawPayloadPost.slug || slug,
    extractedFaqs: blogData.faqs ? blogData.faqs.items : [],
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={jsonLdSchemas} />

      <ReadingProgress />

      <main className="mt-8 max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          ...(blogData.hero.category ? [{ label: blogData.hero.category, href: `/blog?category=${rawPayloadPost.category && typeof rawPayloadPost.category === 'object' ? rawPayloadPost.category.slug : ''}` }] : []),
          { label: blogData.hero.title, href: `/blog/${rawPayloadPost.slug}` },
        ]} />

        <BlogHero {...blogData.hero} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative w-full">
          {/* Desktop Sticky TOC & Author */}
          <div className="hidden lg:block lg:col-span-3 h-full">
            <div className="sticky top-[112px] pb-8 h-fit self-start flex flex-col gap-8">
              <TableOfContents items={blogData.toc} isDesktop={true} />
              <div className="pt-6 border-t border-outline-variant shrink-0">
                <span className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Author</span>
                <AboutAuthor 
                  data={blogData.aboutAuthor} 
                  layout="vertical"
                  className="w-full bg-surface-container-low rounded-xl border border-outline-variant flex flex-col gap-4 p-5"
                />
              </div>
            </div>
          </div>
          
          {/* Main Article Content */}
          <div className="lg:col-span-7 lg:col-start-4 w-full min-w-0">
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
          <div className="lg:col-span-7 lg:col-start-4 w-full min-w-0">
            <div className="mt-12 border-t border-outline-variant pt-10">
              <div className="block lg:hidden mb-12">
                <AboutAuthor data={blogData.aboutAuthor} />
              </div>
              
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
      
      <NewsletterPopup data={newsletterPopupData} />
    </>
  );
}
