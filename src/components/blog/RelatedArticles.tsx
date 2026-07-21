import React from 'react';
import { ArticleCard } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export interface RelatedArticlesProps {
  title?: string;
  moreText?: string;
  moreLink?: string;
  articles: ArticleCard[];
}

export function RelatedArticles({ data }: { data: RelatedArticlesProps | null }) {
  // TODO: Payload CMS - Later, instead of receiving 'articles' through props from the page,
  // we might fetch related articles directly from the server component based on tags or category.
  
  if (!data || !data.articles || data.articles.length === 0) return null;

  const { 
    title = 'You might also like', 
    moreText = 'More from AI Content',
    moreLink = '#',
    articles 
  } = data;

  return (
    <section className="bg-surface-container-lowest py-20 border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <h2 className="text-4xl font-headline-lg font-bold text-primary mb-12 text-center">{title}</h2>
        
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-headline-md text-primary border-l-4 border-secondary-container pl-4">
              {moreText}
            </h3>
            <a className="text-secondary-container font-bold hover:underline underline-offset-4 flex items-center gap-1" href={moreLink}>
              View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {articles.map((article, idx) => (
              <a 
                key={idx} 
                className="group h-full flex flex-col bg-surface rounded-2xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow no-underline block" 
                href={article.link}
              >
                <div className="relative h-40 overflow-hidden w-full">
                  <ImageWithFallback 
                    alt={article.title} 
                    src={article.imageUrl} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                    {article.category}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span> 
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> 
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-xl font-headline-md text-primary group-hover:text-secondary-container transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mt-auto">
                    {article.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
