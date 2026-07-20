import Link from 'next/link';
import { Blog } from '@/data/mockBlogs';
import { Badge } from '@/components/ui/Badge';

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden hover:border-primary-container/20 transition-all group shadow-sm hover:shadow-xl">
      <div className="h-36 bg-surface-container-high relative overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          src={blog.featuredImage} 
          alt={blog.title} 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Badge>{blog.category.title}</Badge>
          <span className="text-outline text-xs">• {blog.readTime}</span>
        </div>
        <h4 className="font-headline-md text-headline-md text-writtenly-navy mb-2 group-hover:opacity-80 transition-opacity line-clamp-2">
          {blog.title}
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src={blog.author.avatarUrl} 
                alt={blog.author.name} 
              />
            </div>
            <span className="font-label-md text-label-md text-writtenly-navy text-sm font-bold">{blog.author.name}</span>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-writtenly-navy transition-colors text-sm">arrow_outward</span>
        </div>
      </div>
    </Link>
  );
}
