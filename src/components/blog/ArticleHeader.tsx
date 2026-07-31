import { UI_Blog as Blog } from '@/types/blog';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';

export function ArticleHeader({ blog }: { blog: Blog }) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex flex-wrap items-center gap-2 mb-6 font-label-md text-label-md font-bold text-on-surface-variant/70">
        <Link href="/" className="hover:text-writtenly-orange transition-colors">Home</Link>
        <ChevronRight className="text-[14px]" />
        <Link href="/" className="hover:text-writtenly-orange transition-colors">Blog</Link>
        <ChevronRight className="text-[14px]" />
        <span className="text-writtenly-navy">{blog.category.title}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Badge variant="solid">{blog.category.title}</Badge>
        <div className="flex items-center gap-2 font-label-md text-label-md font-bold text-on-surface-variant/80 uppercase">
          <span>{blog.publishedDate}</span>
          <span className="text-outline/40">•</span>
          <span className="flex items-center gap-1">
            <Clock className="text-[16px]" />
            {blog.readTime}
          </span>
        </div>
      </div>

      <h1 className="font-display-lg text-display-lg text-writtenly-navy font-bold mb-8 max-w-4xl">
        {blog.title}
      </h1>

      <div className="flex items-center gap-4 mb-10">
        <img 
          src={blog.author.avatarUrl} 
          alt={blog.author.name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-bold text-writtenly-navy">{blog.author.name}</span>
          <span className="font-body-md text-body-md text-on-surface-variant">{blog.author.role}</span>
        </div>
      </div>

      <div className="w-full aspect-[2/1] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-surface-container-high shadow-lg">
        <img 
          src={blog.featuredImage} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
