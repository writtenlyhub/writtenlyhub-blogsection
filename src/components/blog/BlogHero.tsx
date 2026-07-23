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
      <div className="flex justify-start items-center gap-3">
        <span className="inline-block px-3 py-1 bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider rounded-md w-max border border-outline-variant">
          {category || 'Uncategorized'}
        </span>
        {props.isDraft && (
          <span className="inline-block px-3 py-1 bg-writtenly-orange/10 text-writtenly-orange text-xs font-bold uppercase tracking-wider rounded-md w-max border border-writtenly-orange/20">
            Draft
          </span>
        )}
      </div>
      
      <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary leading-tight tracking-tight mt-2">
        {title}
      </h1>
      
      {summary && (
        <p className="font-body-lg text-lg md:text-[1.1875rem] text-on-surface-variant leading-relaxed opacity-90">
          {summary}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-on-surface-variant mt-2 border-t border-b border-outline-variant/30 py-4">
        {author && (
          <div className="flex items-center gap-3 pr-4 sm:border-r border-outline-variant/50">
            <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0">
              <ImageWithFallback 
                alt={author.name} 
                src={author.avatarUrl} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-base">{author.name}</span>
              <span className="text-xs text-outline font-medium tracking-wide">Author</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs md:text-sm font-medium">
          {publishedAt && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span> 
              <span>{publishedAt}</span>
            </div>
          )}
          
          {updatedAt && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-outline">update</span> 
              <span>Updated: {updatedAt}</span>
            </div>
          )}
          
          {readTime && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-outline">schedule</span> 
              <span>{readTime} read</span>
            </div>
          )}
        </div>
      </div>
      
      {imageUrl && (
        <div className="mt-6 relative w-full aspect-[21/9] sm:aspect-video rounded-xl overflow-hidden shadow-sm">
          <ImageWithFallback 
            alt={imageAlt || title} 
            src={imageUrl} 
            fill 
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
          />
        </div>
      )}
    </section>
  );
}
