import React from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/types/blog';
import { ArticleImage } from '@/components/ui/ArticleImageFrame';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

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

export function SuggestedArticleCard({ article, priority = false }: SuggestedArticleCardProps) {
  return (
    <Link
      href={article.link}
      className="group flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl border border-[#E8EAEF] hover:border-writtenly-navy/30 p-4 sm:p-5 gap-4 sm:gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(2,33,80,0.08)] hover:-translate-y-0.5 transition-all duration-300 no-underline overflow-hidden w-full"
    >
      {/* Left side: Image occupying ~38% of card width */}
      <div className="w-full md:w-[38%] shrink-0 rounded-xl overflow-hidden border border-border-subtle self-start md:self-center">
        <ArticleImage
          src={article.imageUrl}
          alt={article.title}
          width={article.imageWidth}
          height={article.imageHeight}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
        />
      </div>

      {/* Right side: Article information occupying ~62% */}
      <div className="w-full md:w-[62%] flex flex-col justify-center min-w-0 py-0.5">
        {/* 1. Category label in small, muted uppercase text */}
        {article.category && (
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-on-surface-variant/70 mb-1.5 block truncate">
            {article.category}
          </span>
        )}

        {/* 2. Article headline in bold WrittenlyHub navy */}
        <h4 className="font-headline-md text-base sm:text-lg md:text-[18px] font-bold text-writtenly-navy group-hover:text-writtenly-orange transition-colors duration-200 line-clamp-2 leading-snug mb-2 tracking-tight">
          {article.title}
        </h4>

        {/* 3. Short description with a maximum of 2–3 lines */}
        {article.summary && (
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant/80 line-clamp-2 md:line-clamp-3 leading-relaxed mb-3">
            {article.summary}
          </p>
        )}

        {/* 4. Publication date & reading time metadata + 5. Orange accent read-more indicator */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-3 text-xs text-on-surface-variant/65 font-medium">
          <div className="flex items-center gap-2 flex-wrap">
            {article.date && (
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-on-surface-variant/50" />
                <span>{article.date}</span>
              </span>
            )}
            {article.date && article.readTime && (
              <span className="text-outline-variant/60">•</span>
            )}
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-on-surface-variant/50" />
                <span>{article.readTime}</span>
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-bold text-writtenly-orange shrink-0 group-hover:translate-x-1 transition-transform duration-200 ml-auto">
            <span className="hidden sm:inline">Read more</span>
            <ArrowRight className="w-3.5 h-3.5 text-writtenly-orange" />
          </div>
        </div>
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

  // Limit to only 2 visible suggested articles
  const displayedArticles = articles.slice(0, 2);
  if (displayedArticles.length === 0) return null;

  return (
    <section className="bg-surface-container-lowest py-12 md:py-16 border-t border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <h2 className="font-headline-lg text-headline-lg font-bold text-writtenly-navy mb-12 text-center">
          {title}
        </h2>

        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-headline-md font-bold text-writtenly-navy border-l-4 border-writtenly-orange pl-4">
              {moreText}
            </h3>
            <a
              className="font-label-md text-label-md text-writtenly-orange font-bold hover:underline underline-offset-4 flex items-center gap-1 group"
              href={moreLink || '/blog'}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {displayedArticles.map((article, idx) => (
              <SuggestedArticleCard key={article.link || idx} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Aliases for compatibility
export const SuggestedArticles = RelatedArticles;
export default RelatedArticles;

