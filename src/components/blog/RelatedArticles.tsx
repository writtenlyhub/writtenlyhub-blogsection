import { Blog } from '@/data/mockBlogs';
import { BlogCard } from './BlogCard';

export function RelatedArticles({ articles }: { articles: Blog[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 border-t border-outline-variant/30">
      <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold mb-8">
        Read Next
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 xl:gap-8">
        {articles.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
