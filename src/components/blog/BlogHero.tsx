import React from 'react';
import { BlogHeroData } from '@/types/blog';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { PlayArticleButton } from '@/components/blog/PlayArticleButton';
import { Calendar, Clock } from 'lucide-react';

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
    <section className="flex flex-col items-center text-center gap-6 mb-8 w-full">
      <div className="flex justify-center items-center gap-3">
        {category ? (
          <Link href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block px-3 py-1 bg-white/10 text-white hover:bg-white/20 transition-colors font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-white/20">
            {category}
          </Link>
        ) : (
          <span className="inline-block px-3 py-1 bg-white/10 text-white font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-white/20">
            Uncategorized
          </span>
        )}
        {props.isDraft && (
          <span className="inline-block px-3 py-1 bg-writtenly-orange/20 text-writtenly-orange font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-writtenly-orange/30">
            Draft
          </span>
        )}
      </div>
      
      <h1 className="font-headline-xl text-headline-xl font-bold text-white mt-2">
        {title}
      </h1>
      
      {summary && (
        <p className="font-body-xl text-body-xl text-white/90">
          {summary}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-body-sm text-body-sm text-white/80 mt-2 border-t border-b border-white/20 py-4 w-full max-w-4xl">
        {author && (
          <div className="flex items-center gap-3 pr-4 sm:border-r border-white/30">
            <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0">
              <ImageWithFallback 
                alt={author.name} 
                src={author.avatarUrl} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md font-bold text-white">{author.name}</span>
              <span className="font-label-sm text-label-sm text-white/60 font-medium">Author</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-label-md text-label-md font-medium w-full sm:w-auto">
          {(updatedAt || publishedAt) && (
            <div className="flex items-center gap-1.5">
              <Calendar className="text-[16px] text-white/60" /> 
              <span>{updatedAt || publishedAt}</span>
            </div>
          )}
          
          {readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="text-[16px] text-white/60" /> 
              <span>{readTime}</span>
            </div>
          )}

          <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:pl-2">
            <PlayArticleButton layout="compact" inverted />
          </div>
        </div>
      </div>
      
      {imageUrl && (
        <div className="mt-8 relative w-full aspect-[21/9] max-h-[450px] rounded-xl overflow-hidden shadow-xl border border-white/10">
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
