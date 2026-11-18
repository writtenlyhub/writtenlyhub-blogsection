'use client';

import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { UI_Blog as Blog } from '@/types/blog';

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/${blog.contentType}/${blog.slug}`}
      className="group flex flex-col cursor-pointer h-full"
    >
      <div className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden bg-surface-container-low border border-[#E8EAF0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-4 transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] group-hover:border-[#D9DCE5]">
        <ImageWithFallback
          src={blog.featuredImage}
          alt={blog.altText || blog.title || 'Blog Image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 px-1 mt-1">
        <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2">
          {blog.publishedDate}
        </div>

        <h3 className="font-headline-md text-[17px] md:text-[19px] leading-[1.35] font-bold text-writtenly-navy tracking-tight group-hover:text-writtenly-orange transition-colors">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}
