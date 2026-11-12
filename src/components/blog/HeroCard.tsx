import Link from 'next/link';
import { ArticleImage } from '../ui/ArticleImageFrame';
import { UI_Blog as Blog } from '@/types/blog';
import { ChevronRight } from 'lucide-react';

export function HeroCard({ blog }: { blog: Blog }) {
  const href =
    blog.contentType === 'news'
      ? `/news/${blog.slug}`
      : `/blog/${blog.slug}`;

  return (
    <section className="w-full px-gutter max-w-container-max mx-auto mb-4 mt-2">
      <Link href={href} className="group relative flex flex-col lg:flex-row bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant hover:border-primary-container/20 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
        {/* Image - 50% width on Desktop */}
        <div className="w-full lg:w-[50%] shrink-0 overflow-hidden hidden min-[375px]:block lg:block self-center">
          <ArticleImage
            src={blog.featuredImage}
            alt={blog.altText || blog.title}
            width={blog.imageWidth}
            height={blog.imageHeight}
            priority={true}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        
        <div className="p-6 lg:p-8 lg:w-[50%] flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="border border-writtenly-navy/30 text-writtenly-navy rounded-full px-2.5 py-0.5 font-label-sm text-label-sm font-bold uppercase bg-transparent">
              {blog.category.title}
            </span>
          </div>
          
          <h2 className="font-display-lg text-display-lg text-writtenly-navy font-bold mb-3 group-hover:text-writtenly-orange transition-colors line-clamp-3">
            {blog.title}
          </h2>

          <div className="flex items-center gap-1.5 font-body-md text-body-md text-on-surface-variant mb-5">
            <span className="font-bold text-writtenly-navy/80">{blog.author.name}</span>
            <span className="text-outline/80 px-1">•</span>
            <span>{blog.publishedDate}</span>
            <span className="text-outline/80 px-1">•</span>
            <span>{blog.readTime}</span>
          </div>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant/80 mb-8 line-clamp-3">
            {blog.excerpt}
          </p>
          
          <div className="mt-auto flex justify-start items-center pt-2">
            <div className="flex items-center gap-1 border border-outline-variant/40 rounded px-4 py-2 font-label-md text-label-md font-bold text-on-surface-variant group-hover:border-writtenly-navy group-hover:text-writtenly-navy transition-colors">
              <span>Read more</span>
              <ChevronRight className="text-[16px]" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
