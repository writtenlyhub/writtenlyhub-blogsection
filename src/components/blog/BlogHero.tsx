import React from 'react';
import { BlogHeroData } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function BlogHero(props: BlogHeroData) {
  const {
    category,
    title,
    summary,
    author,
    publishedAt,
    updatedAt,
    readTime,
    imageUrl,
    imageAlt,
  } = props;

  // Graceful handling of missing data
  if (!title) return null;

  return (
    <section className="flex flex-col gap-8 mb-12 w-full max-w-4xl mx-auto">
      <div className="flex justify-start">
        <span className="inline-block px-3 py-1 bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider rounded-md w-max border border-outline-variant">
          {category || 'Uncategorized'}
        </span>
      </div>
      
      <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary leading-[1.1]">
        {title}
      </h1>
      
      {summary && (
        <p className="font-body-lg text-[1.1875rem] text-on-surface-variant leading-relaxed">
          {summary}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-8 text-sm text-on-surface-variant">
        {author && (
          <div className="flex items-center gap-3 pr-4 border-r border-outline-variant">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <ImageWithFallback 
                alt={author.name} 
                src={author.avatarUrl} 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="font-bold text-primary">{author.name}</span>
          </div>
        )}
        
        {publishedAt && (
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-label-md text-outline text-[11px] uppercase tracking-wider">Published</span>
            <div className="flex items-center gap-1 font-medium text-primary">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span> {publishedAt}
            </div>
          </div>
        )}
        
        {updatedAt && (
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-label-md text-outline text-[11px] uppercase tracking-wider">Last Updated</span>
            <div className="flex items-center gap-1 font-medium text-primary">
              <span className="material-symbols-outlined text-[18px]">update</span> {updatedAt}
            </div>
          </div>
        )}
        
        {readTime && (
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-label-md text-outline text-[11px] uppercase tracking-wider">Read Time</span>
            <div className="flex items-center gap-1 font-medium text-primary">
              <span className="material-symbols-outlined text-[18px]">schedule</span> {readTime}
            </div>
          </div>
        )}
      </div>
      
      {imageUrl && (
        <div className="mt-4 relative w-[90%] mx-auto aspect-video rounded-2xl overflow-hidden border border-outline-variant shadow-lg">
          <ImageWithFallback 
            alt={imageAlt || title} 
            src={imageUrl} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      )}
    </section>
  );
}
