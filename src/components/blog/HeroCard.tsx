import Link from 'next/link';
import { Blog } from '@/data/mockBlogs';
import { Badge } from '@/components/ui/Badge';

export function HeroCard({ blog }: { blog: Blog }) {
  return (
    <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-8 pt-2">
      <Link href={`/blog/${blog.slug}`} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant hover:border-primary-container/20 transition-all shadow-md hover:shadow-xl block">
        <div className="h-40 lg:h-[260px] lg:col-span-7 bg-surface-container-high relative overflow-hidden">
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={blog.featuredImage} 
            alt={blog.title} 
          />
        </div>
        <div className="p-5 lg:p-6 lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="solid">{blog.category.title}</Badge>
            <span className="text-on-surface-variant font-body-md text-body-md text-sm">{blog.publishedDate}</span>
            <span className="text-outline text-xs">• {blog.readTime}</span>
          </div>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-writtenly-navy mb-3 group-hover:opacity-80 transition-opacity line-clamp-2">
            {blog.title}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-5 line-clamp-3">
            {blog.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-surface-container-lowest shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src={blog.author.avatarUrl} 
                  alt={blog.author.name} 
                />
              </div>
              <div>
                <div className="font-label-md text-label-md text-primary-container font-bold">{blog.author.name}</div>
                <div className="font-body-md text-body-md text-sm text-on-surface-variant">{blog.author.role}</div>
              </div>
            </div>
            <div className="text-secondary-container font-label-md text-label-md flex items-center gap-1 group-hover:gap-2 transition-all font-bold">
              Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
