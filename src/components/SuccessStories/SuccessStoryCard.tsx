import React from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { SuccessStory, Media, SuccessStoryCategory } from '@/payload-types';

import { getMediaUrl } from '@/lib/utils/blogMapper';

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  const featuredImage = story.featuredImage as Media | null;
  const clientLogo = story.clientLogo as Media | null;
  const category = story.category as SuccessStoryCategory | null;

  return (
    <Link href={`/success-stories/${story.slug}`} className="group flex flex-col cursor-pointer h-full">
      <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-surface-variant relative mb-4">
        {featuredImage?.url ? (
          <ImageWithFallback
            src={getMediaUrl(featuredImage.url)}
            alt={featuredImage.alt || story.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-surface-variant flex items-center justify-center">
            <span className="text-on-surface-variant/50">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-1 mt-1">
        {clientLogo?.url ? (
          <div className="h-12 md:h-14 mb-2 flex items-center justify-start overflow-visible mix-blend-multiply">
            <img 
              src={getMediaUrl(clientLogo.url)} 
              alt={clientLogo.alt || story.clientName || story.title} 
              className="h-24 md:h-28 w-auto max-w-[220px] object-contain object-left" 
            />
          </div>
        ) : (
          <h3 className="font-headline-md text-[17px] md:text-[19px] leading-[1.35] font-bold text-writtenly-navy tracking-tight mb-4">
            {story.clientName || story.title}
          </h3>
        )}
        <p className="font-body-md text-[13px] text-on-surface-variant/90 leading-relaxed mb-6 line-clamp-3">
          {story.shortDescription}
        </p>
        <div className="mt-auto">
          {category && (
            <span className="inline-flex items-center bg-white border border-black/5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.08)] text-on-surface-variant/80 px-4 py-1.5 rounded-full text-[11px] font-medium font-label-md">
              {category.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
