import React from 'react';

import { notFound } from 'next/navigation';
import { BlogHero } from '@/components/blog/BlogHero';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { RichText } from '@/components/blog/RichText';
import { Quote } from '@/components/blog/Quote';
import { KeyTakeaways } from '@/components/blog/KeyTakeaways';
import { InlineCTA } from '@/components/blog/InlineCTA';
import { Conclusion } from '@/components/blog/Conclusion';
import { AboutAuthor } from '@/components/blog/AboutAuthor';
import { FooterCTA } from '@/components/blog/FooterCTA';
import { WatchLearn } from '@/components/blog/WatchLearn';
import { FAQ } from '@/components/blog/FAQ';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import Link from 'next/link';
import { mapBlogData } from '@/lib/utils/blogMapper';
import { getCachedPostBySlug } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { getCachedPosts } = await import('@/lib/api');
  const posts = await getCachedPosts(100, 1);
  return posts.docs.map((post) => ({
    slug: post.slug,
  }));
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
  const rawPayloadPost = await getCachedPostBySlug(slug); 
  const blogData = mapBlogData(rawPayloadPost);

  if (!rawPayloadPost || !blogData) {
    notFound();
  }

  const { getCachedAdjacentPosts } = await import('@/lib/api');
  const adjacent = rawPayloadPost.publishedAt ? await getCachedAdjacentPosts(rawPayloadPost.publishedAt) : { prev: null, next: null };

  return (
    <>
      <ReadingProgress />

      <main className="mt-8 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto py-4 flex items-center text-on-surface-variant gap-2 text-sm font-label-md mb-8">
          <Link className="hover:text-secondary-container transition-colors" href="/">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="hover:text-secondary-container transition-colors" href="/blog">Library</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-secondary-container font-medium">{blogData.hero.title.substring(0, 36)}...</span>
        </div>

        <BlogHero {...blogData.hero} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative pb-section-gap">
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[112px] pb-8">
              <TableOfContents items={blogData.toc} />
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:col-start-5 w-full lg:pl-10">
            <ArticleContent>
            <div className="mb-10 max-w-[72ch] w-full">
              <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <h3 className="text-2xl font-bold text-primary mt-0 mb-4 font-headline-md scroll-mt-header-height" id="heading-0">Overview</h3>
                <p className="text-on-surface-variant m-0 text-lg leading-[1.8] max-w-[72ch]">
                  This article explores the practical, immediate applications of Artificial Intelligence in modern business operations. We detail ten specific ways companies are currently deploying AI tools to reduce manual workloads, optimize their sales funnels, and generate new revenue streams.
                </p>
              </div>

              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant my-10 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mt-0 mb-5 font-headline-md flex items-center gap-2 scroll-mt-header-height" id="heading-1">
                  <span className="material-symbols-outlined text-secondary-container">bolt</span> Quick Facts
                </h3>
                <ul className="space-y-3 m-0 text-on-surface-variant list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container shrink-0 mt-1">check_circle</span>
                    <span><strong>Target Audience:</strong> Business leaders, operational managers, and marketing directors looking to integrate AI pragmatically.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container shrink-0 mt-1">check_circle</span>
                    <span><strong>Key Insight:</strong> AI adoption has shifted from experimental to operational, focusing on measurable ROI.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container shrink-0 mt-1">check_circle</span>
                    <span><strong>Primary Benefits:</strong> Significant reduction in routine task hours (up to 40%) and improved customer response times.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container shrink-0 mt-1">check_circle</span>
                    <span><strong>Actionable Next Step:</strong> Audit your current workflows to identify repetitive tasks ripe for AI automation.</span>
                  </li>
                </ul>
              </div>
            </div>

            <RichText className="mb-8" content={blogData.contentBlocks.intro} />

            <Quote data={blogData.quote} />

            <h2 id="section1" className="text-3xl font-headline-lg font-bold text-primary mt-10 mb-4 max-w-[72ch] scroll-mt-header-height">1. Automating Customer Support Responses</h2>
            <RichText content={blogData.contentBlocks.section1} />

            <div className="w-full max-w-[72ch] my-10 p-6 bg-surface-container-low rounded-2xl shadow-sm flex gap-4 items-start">
              <span className="material-symbols-outlined text-secondary-container text-2xl shrink-0">lightbulb</span>
              <div>
                <h4 className="text-primary font-bold mt-0 mb-2 font-headline-md text-[1.0625rem]">Pro Tip</h4>
                <p className="m-0 text-on-surface-variant text-base">When implementing AI support, always provide a clear and seamless escalation path to a human agent for complex issues that require empathy or nuanced understanding.</p>
              </div>
            </div>

            <h2 id="section2" className="text-3xl font-headline-lg font-bold text-primary mt-10 mb-4 max-w-[72ch] scroll-mt-header-height">2. Enhancing Sales Lead Qualification</h2>
            <RichText content={blogData.contentBlocks.section2} />

            <div className="my-10 relative max-w-[72ch] w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-outline-variant">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img alt="AI Strategy Session Illustration" className="w-full h-full object-cover" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgcng9IjgiIGZpbGw9IiNlOGVhZWQiLz48cGF0aCBkPSJNMTcwIDEzMCBsMzAgNDAgbDIwLTE1IGw0MCA1NSBIMTQweiIgZmlsbD0iI2JkYzFjNiIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjEyMCIgcj0iMTgiIGZpbGw9IiNiZGMxYzYiLz48L3N2Zz4=" />
            </div>

            <RichText content={blogData.contentBlocks.section2_afterImage} />

            <div id="heading-4" className="scroll-mt-header-height">
              <InlineCTA data={blogData.inlineCTA} />
            </div>

            <h2 id="section3" className="text-3xl font-headline-lg font-bold text-primary mt-10 mb-4 max-w-[72ch] scroll-mt-header-height">3. Personalizing Marketing Campaigns</h2>
            <RichText content={blogData.contentBlocks.section3} />

            <div id="heading-6" className="scroll-mt-header-height">
              <KeyTakeaways data={blogData.keyTakeaways} />
            </div>

            <Conclusion content={blogData.contentBlocks.conclusion} />
            
          </ArticleContent>

          <div className="mt-24 border-t border-outline-variant pt-12">
          <AboutAuthor data={blogData.aboutAuthor} />
          <FooterCTA data={blogData.footerCTA} />
          <WatchLearn data={blogData.watchLearn} />
          
          <FAQ data={blogData.faqs} />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-outline-variant py-8 mb-16">
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

      <RelatedArticles data={{ articles: blogData.relatedArticles }} />
    </>
  );
}
