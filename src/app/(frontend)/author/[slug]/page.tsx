import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCachedAuthorProfileData, getCachedAllAuthorSlugs } from '@/lib/api/cache';
import { AuthorHero } from '@/components/author/AuthorHero';
import { AuthorStats } from '@/components/author/AuthorStats';
import { AuthorContentStream } from '@/components/author/AuthorContentStream';
import { Newsletter } from '@/components/ui/Newsletter';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getCachedAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profileData = await getCachedAuthorProfileData(slug);

  if (!profileData) {
    return {
      title: 'Author Not Found | WrittenlyHub',
      description: 'The requested author profile could not be found.',
    };
  }

  const { author } = profileData;
  const canonicalUrl = `${SITE_URL}/author/${author.slug}`;
  const ogImage = author.avatarUrl || `${SITE_URL}/images/og/default-og.webp`;
  const metaDescription =
    author.bio ||
    `Read industry research, frameworks, and market analysis written by ${author.name} on WrittenlyHub.`;

  return {
    title: `${author.name} - Author Profile`,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${author.name} - Author Profile | WrittenlyHub`,
      description: metaDescription,
      url: canonicalUrl,
      type: 'profile',
      siteName: 'WrittenlyHub',
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - Author Profile | WrittenlyHub`,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const profileData = await getCachedAuthorProfileData(slug);

  if (!profileData) {
    notFound();
  }

  const { author, allArticles, blogs, news } = profileData;

  const authorCanonicalUrl = `${SITE_URL}/author/${author.slug}`;
  const authorAvatarUrl = author.avatarUrl || `${SITE_URL}/images/og/default-og.webp`;

  const sameAsLinks = [author.linkedin, author.twitter, author.website].filter(
    (link): link is string => Boolean(link)
  );

  // Schema.org ProfilePage and Person Structured Data
  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: author.name,
        description: author.bio,
        jobTitle: author.designation,
        image: authorAvatarUrl,
        url: authorCanonicalUrl,
        sameAs: sameAsLinks.length > 0 ? sameAsLinks : undefined,
        worksFor: {
          '@type': 'Organization',
          name: 'WrittenlyHub',
          url: 'https://writtenlyhub.com',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Authors',
          item: `${SITE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: author.name,
          item: authorCanonicalUrl,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdSchemas} />

      <main className="w-full bg-surface min-h-screen">
        {/* Author Profile & Hero Section */}
        <AuthorHero author={author} />

        {/* Publishing Statistics Ribbon */}
        <AuthorStats author={author} />

        {/* Filter Toolbar, Flagship Story, & Articles Stream Grid */}
        <AuthorContentStream
          authorName={author.name}
          articles={allArticles}
          totalAllCount={author.totalArticles}
          totalBlogsCount={author.blogsCount}
          totalNewsCount={author.newsCount}
        />

        {/* Author Dedicated Newsletter CTA (Native Blog CTA Box) */}
        <div className="pb-16 pt-4">
          <Newsletter
            source={`Author Profile: ${author.name}`}
            title={`Follow ${author.name.split(' ')[0]}'s latest research.`}
            description="Get monthly teardowns on content architecture, SEO algorithms, and editorial strategy delivered straight to your inbox."
          />
        </div>
      </main>
    </>
  );
}

