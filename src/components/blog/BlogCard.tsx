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
        <Image 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          src={blog.featuredImage} 
          alt={blog.altText || blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="border border-writtenly-navy/30 text-writtenly-navy rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-transparent">
            {blog.category.title}
          </span>
        </div>
        
        <h4 className="font-headline-md text-headline-md text-writtenly-navy font-bold mb-2 leading-[1.3] group-hover:text-writtenly-orange transition-colors">
          {blog.title}
        </h4>
        
        <div className="flex items-center gap-1.5 text-[13px] text-on-surface-variant mb-4">
          <span className="font-bold text-writtenly-navy/80">{blog.author.name}</span>
          <span className="text-outline/50 px-1">•</span>
          <span>{blog.publishedDate}</span>
        </div>
        
        <p className="font-body-md text-body-md text-on-surface-variant/80 mb-6 leading-relaxed">
          {blog.excerpt}
        </p>
        
        <div className="mt-auto flex justify-start items-center pt-2">
          <div className="flex items-center gap-1 border border-outline-variant/40 rounded px-3 py-1.5 text-[12px] font-bold text-on-surface-variant group-hover:border-writtenly-navy group-hover:text-writtenly-navy transition-colors">
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
