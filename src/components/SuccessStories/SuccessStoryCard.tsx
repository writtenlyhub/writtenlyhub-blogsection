import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SuccessStory, Media, SuccessStoryCategory } from '@/payload-types';

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  const featuredImage = story.featuredImage as Media | null;
  const clientLogo = story.clientLogo as Media | null;
  const category = story.category as SuccessStoryCategory | null;

  return (
    <Link href={`/success-stories/${story.slug}`} className="group flex flex-col cursor-pointer h-full">
      <div className="aspect-[1/1.05] w-full rounded-3xl overflow-hidden bg-surface-variant relative mb-4">
        {featuredImage?.url ? (
          <img
            src={featuredImage.url}
            alt={featuredImage.alt || story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-surface-variant flex items-center justify-center">
            <span className="text-on-surface-variant/50">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-1">
        {clientLogo?.url ? (
          <div className="h-12 md:h-14 mb-2 flex items-center justify-start overflow-visible mix-blend-multiply">
            <img 
              src={clientLogo.url} 
              alt={clientLogo.alt || story.clientName || story.title} 
              className="h-24 md:h-28 w-auto max-w-[220px] object-contain object-left" 
            />
          </div>
        ) : (
          <h3 className="font-headline-md text-[26px] font-bold text-writtenly-navy tracking-tight mb-4">
            {story.clientName || story.title}
          </h3>
        )}
        <p className="font-body-md text-[15px] text-on-surface-variant/90 leading-relaxed mb-6 line-clamp-3">
          {story.shortDescription}
        </p>
        <div className="mt-auto">
          {category && (
            <span className="inline-flex items-center bg-white border border-black/5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.08)] text-on-surface-variant/80 px-5 py-2 rounded-full text-[13px] font-medium font-label-md">
              {category.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
