import React from 'react';
import { ArticleCard } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

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
    <section className="bg-surface-container-lowest py-12 md:py-16 border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-12 text-center">{title}</h2>
        
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-headline-md font-bold text-primary border-l-4 border-secondary-container pl-4">
              {moreText}
            </h3>
            <a className="font-label-md text-label-md text-secondary-container font-bold hover:underline underline-offset-4 flex items-center gap-1" href={moreLink}>
              View All <ArrowRight className="text-[18px]" />
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
                  <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-md text-label-md font-bold px-3 py-1 rounded-full z-10">
                    {article.category}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-4 font-label-md text-label-md text-on-surface-variant font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="text-[14px]" /> 
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="text-[14px]" /> 
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary group-hover:text-secondary-container transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-auto">
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
