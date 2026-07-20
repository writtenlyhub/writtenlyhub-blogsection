import Link from 'next/link';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Blog } from '@/data/mockBlogs';

export function HeroCard({ blog }: { blog: Blog }) {
  return (
    <section className="w-full px-gutter max-w-container-max mx-auto mb-4 mt-2">
      <Link href={`/blog/${blog.slug}`} className="group relative flex flex-col lg:flex-row bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant hover:border-primary-container/20 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 block">
        {/* Image - 60% width on Desktop, short cinematic ratio on mobile */}
        <div className="aspect-[2/1] lg:aspect-auto lg:h-auto lg:w-[60%] shrink-0 bg-surface-container-high relative overflow-hidden hidden min-[375px]:block lg:block">
          {/* Subtle inner ring for real photography integration */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 z-10 pointer-events-none rounded-[inherit]" />
          <ImageWithFallback 
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105" 
            src={blog.featuredImage} 
            alt={blog.altText || blog.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={blog.featuredHero}
          />
        </div>
        
        <div className="p-6 md:p-8 lg:p-10 lg:w-[40%] flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="border border-writtenly-navy/30 text-writtenly-navy rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-transparent">
              {blog.category.title}
            </span>
          </div>
          
          <h2 className="font-display-lg text-[clamp(24px,2.5vw,36px)] text-writtenly-navy font-bold mb-3 group-hover:text-writtenly-orange transition-colors leading-[1.15] tracking-tight line-clamp-3">
            {blog.title}
          </h2>

          <div className="flex items-center gap-1.5 text-[14px] text-on-surface-variant mb-5">
            <span className="font-bold text-writtenly-navy/80">{blog.author.name}</span>
            <span className="text-outline/50 px-1">•</span>
            <span>{blog.publishedDate}</span>
            <span className="text-outline/50 px-1">•</span>
            <span>{blog.readTime}</span>
          </div>
          
          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant/80 leading-[1.7] mb-8 line-clamp-3">
            {blog.excerpt}
          </p>
          
          <div className="mt-auto flex justify-start items-center pt-2">
            <div className="flex items-center gap-1 border border-outline-variant/40 rounded px-4 py-2 text-[13px] font-bold text-on-surface-variant group-hover:border-writtenly-navy group-hover:text-writtenly-navy transition-colors">
              <span>Read more</span>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
