import Link from 'next/link';
import Image from 'next/image';
import { UI_Blog as Blog } from '@/types/blog';

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link 
      href={`/blog/${blog.slug}`} 
      className="flex flex-col h-full bg-surface-container-lowest rounded-xl border border-outline-variant/60 overflow-hidden hover:border-writtenly-navy/30 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="aspect-[3/2] shrink-0 bg-surface-container-high relative overflow-hidden">
        {blog.featuredImage ? (
          <Image 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
            src={blog.featuredImage} 
            alt={blog.altText || blog.title || "Blog Image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-medium">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <span className="border border-writtenly-navy/30 text-writtenly-navy rounded-full px-2.5 py-0.5 font-label-sm text-label-sm font-bold uppercase bg-transparent">
            {blog.category.title}
          </span>
        </div>
        
        <h3 className="font-headline-md text-headline-md text-writtenly-navy font-bold mb-2 group-hover:text-writtenly-orange transition-colors">
          {blog.title}
        </h3>
        
        <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-4">
          <span className="font-bold text-writtenly-navy/80">{blog.author.name}</span>
          <span className="text-outline/80 px-1">•</span>
          <span>{blog.publishedDate}</span>
        </div>
        
        <p className="font-body-md text-body-md text-on-surface-variant/80 mb-4">
          {blog.excerpt}
        </p>
        
        <div className="mt-auto flex justify-start items-center pt-2">
          <div className="flex items-center gap-1 border border-outline-variant/40 rounded px-3 py-1.5 font-label-md text-label-md font-bold text-on-surface-variant group-hover:border-writtenly-navy group-hover:text-writtenly-navy transition-colors">
            <span>Read more</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
