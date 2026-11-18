import React from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export interface RelatedArticlesProps {
  title?: string;
  moreText?: string;
  moreLink?: string;
  articles: ArticleCard[];
}

export interface SuggestedArticleCardProps {
  article: ArticleCard;
  priority?: boolean;
}

export function SuggestedArticleCard({ article }: SuggestedArticleCardProps) {
  return (
    <Link
      href={article.link}
      className="group flex flex-col cursor-pointer h-full"
    >
      <div className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden bg-surface-container-low border border-[#E8EAF0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-4 transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] group-hover:border-[#D9DCE5]">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.title || 'Suggested Article'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 px-1 mt-1">
        <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2">
          {article.date || article.category}
        </div>

        <h3 className="font-headline-md text-[17px] md:text-[19px] leading-[1.35] font-bold text-writtenly-navy tracking-tight group-hover:text-writtenly-orange transition-colors">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

export function RelatedArticles({ data }: { data: RelatedArticlesProps | null }) {
  if (!data || !data.articles || data.articles.length === 0) return null;

  const { 
    title = 'You might also like', 
    moreText = 'More from our Blog',
    moreLink = '/blog',
    articles 
  } = data;

  // Show up to 3 suggested articles to form a full 3-column row
  const displayedArticles = articles.slice(0, 3);
  if (displayedArticles.length === 0) return null;

  return (
    <section className="w-full max-w-container-max mx-auto px-6 md:px-gutter pt-16 pb-20 border-t border-outline-variant/30 my-12">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-writtenly-navy tracking-tight">
          {title}
        </h3>
        {moreLink && (
          <Link
            href={moreLink}
            className="group inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-writtenly-navy hover:text-writtenly-orange transition-colors"
          >
            <span>{moreText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {displayedArticles.map((article, idx) => (
          <SuggestedArticleCard
            key={`${article.link}-${idx}`}
            article={article}
            priority={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}
