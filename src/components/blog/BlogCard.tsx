import Link from 'next/link';
import Image from 'next/image';
import { UI_Blog as Blog } from '@/types/blog';

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link 
      href={`/blog/${blog.slug}`} 
      className="group flex flex-col cursor-pointer h-full"
    >
      <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-surface-variant relative mb-4">
        {blog.featuredImage ? (
          <Image 
            src={blog.featuredImage} 
            alt={blog.altText || blog.title || "Blog Image"}
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
        <div className="font-body-sm text-[12px] text-on-surface-variant/70 mb-2">
          {blog.publishedDate}
        </div>
        
        <h3 className="font-headline-md text-[17px] md:text-[19px] leading-[1.35] font-bold text-writtenly-navy tracking-tight">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}
