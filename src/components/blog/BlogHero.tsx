'use client';

import React, { useState } from 'react';
import { BlogHeroData } from '@/types/blog';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { PlayArticleButton } from '@/components/blog/PlayArticleButton';
import { Calendar, Clock } from 'lucide-react';

export function BlogHero(props: BlogHeroData) {
  const {
    contentType,
    category,
    title,
    summary,
    author,
    publishedAt,
    updatedAt,
    readTime,
    imageUrl,
    imageAlt,
    imageWidth,
    imageHeight,
    focalX,
    focalY,
  } = props;

  // Calculate known aspect ratio from Payload CMS metadata (if available)
  const initialRatio =
    imageWidth && imageHeight && imageWidth > 0 && imageHeight > 0
      ? imageWidth / imageHeight
      : undefined;

  const [aspectRatio, setAspectRatio] = useState<number | undefined>(initialRatio);

  // Graceful handling of missing data
  if (!title) return null;

  // If aspect ratio is significantly narrower than the 21/9 container (< 1.6),
  // forcing object-cover would aggressively crop out >30%–60% of vertical content
  // (such as news headlines, infographic charts, or portrait subjects).
  // For these images, we preserve the full original image (object-contain) centered
  // over an edge-to-edge ambient backdrop of the same image so the existing container
  // remains completely filled without unwanted white gaps or cropped content.
  const isWidescreen = aspectRatio !== undefined ? aspectRatio >= 1.6 : true;

  // Compute focal-point object position if available from Payload (0-100%)
  const hasFocalPoint =
    typeof focalX === 'number' && typeof focalY === 'number';
  const focalPosition = hasFocalPoint ? `${focalX}% ${focalY}%` : 'center';

  return (
    <section className="flex flex-col items-center text-center gap-6 mb-8 w-full">
      <div className="flex justify-center items-center gap-3">
        {category ? (
          <Link href={`${contentType === 'news' ? '/news' : '/blog'}?category=${category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block px-3 py-1 bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-outline-variant">
            {category}
          </Link>
        ) : (
          <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-outline-variant">
            Uncategorized
          </span>
        )}
        {props.isDraft && (
          <span className="inline-block px-3 py-1 bg-writtenly-orange/20 text-writtenly-orange font-label-sm text-label-sm font-bold uppercase rounded-md w-max border border-writtenly-orange/30">
            Draft
          </span>
        )}
      </div>
      
      <h1 className="font-headline-xl text-headline-xl font-bold text-writtenly-navy mt-2">
        {title}
      </h1>
      
      {summary && (
        <p className="font-body-xl text-body-xl text-on-surface-variant">
          {summary}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-body-sm text-body-sm text-on-surface-variant mt-2 border-t border-b border-outline-variant py-4 w-full max-w-4xl">
        {author && (
          <div className="flex items-center justify-center gap-3 sm:pr-4 sm:border-r border-outline-variant">
            <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0">
              <ImageWithFallback 
                alt={author.name} 
                src={author.avatarUrl} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md font-bold text-writtenly-navy">{author.name}</span>
              <span className="font-label-sm text-label-sm text-outline font-medium">Author</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-label-md text-label-md font-medium w-full sm:w-auto">
          {(updatedAt || publishedAt) && (
            <div className="flex items-center gap-1.5">
              <Calendar className="text-[16px] text-outline" /> 
              <span>{updatedAt || publishedAt}</span>
            </div>
          )}
          
          {readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="text-[16px] text-outline" /> 
              <span>{readTime}</span>
            </div>
          )}

          <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:pl-2 flex justify-center">
            <PlayArticleButton layout="compact" />
          </div>
        </div>
      </div>
      
      {imageUrl && (
        <div className="mt-8 relative w-full aspect-[21/9] max-h-[450px] rounded-xl overflow-hidden shadow-xl bg-surface-container-low flex items-center justify-center">
          {!isWidescreen && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <ImageWithFallback 
                alt="" 
                src={imageUrl} 
                fill 
                className="object-cover blur-2xl scale-110 opacity-35" 
                priority={false}
                aria-hidden
              />
            </div>
          )}
          <ImageWithFallback 
            alt={imageAlt || title} 
            src={imageUrl} 
            fill 
            className={`w-full h-full transition-opacity duration-300 ${
              isWidescreen
                ? 'object-cover'
                : 'object-contain object-center z-10'
            }`}
            style={isWidescreen ? { objectPosition: focalPosition } : undefined}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                const ratio = img.naturalWidth / img.naturalHeight;
                if (ratio !== aspectRatio) {
                  setAspectRatio(ratio);
                }
              }
            }}
          />
        </div>
      )}
    </section>
  );
}
