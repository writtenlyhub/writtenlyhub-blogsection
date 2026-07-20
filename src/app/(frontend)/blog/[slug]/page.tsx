import { MOCK_BLOGS } from '@/data/mockBlogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorProfile } from '@/components/blog/AuthorProfile';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { Newsletter } from '@/components/ui/Newsletter';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = MOCK_BLOGS.find((b) => b.slug === params.slug);
  
  if (!blog) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${blog.title} | WrittenlyHub`,
    description: blog.excerpt,
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedDate,
      authors: [blog.author.name],
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

export default function BlogArticlePage({ params }: PageProps) {
  const blog = MOCK_BLOGS.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  // Fallback to latest articles if no related ones exist in the same category
  const relatedArticles = MOCK_BLOGS.filter(
    (b) => b.category.slug === blog.category.slug && b.id !== blog.id
  ).slice(0, 3);
  
  const articlesToShow = relatedArticles.length === 3 
    ? relatedArticles 
    : [...relatedArticles, ...MOCK_BLOGS.filter(b => b.id !== blog.id)].slice(0, 3);

  // If we don't have mock HTML, use a placeholder
  const htmlContent = blog.contentHtml || `
    <p>This is a placeholder for the article content. The CMS integration will provide full rich-text HTML here.</p>
    <h2>Understanding the Basics</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur, nulla ut fermentum cursus, enim orci convallis est, vel hendrerit orci ipsum eu nisl. Praesent nec lectus vel massa ullamcorper tristique. Proin vel est sit amet nunc scelerisque egestas.</p>
    <h3>Key Takeaways</h3>
    <ul>
      <li>Focus on quality over quantity.</li>
      <li>Always write for your audience first.</li>
      <li>Distribute where your audience spends their time.</li>
    </ul>
  `;

  return (
    <>
      <ReadingProgress />
      
      <article className="w-full max-w-container-max mx-auto px-gutter pt-8 lg:pt-12 pb-16">
        <ArticleHeader blog={blog} />

        {/* 
          Main Grid Layout
          Mobile: Single column 
          Desktop: 1fr content + 300px sidebar
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 relative">
          
          {/* Main Article Content */}
          <main className="w-full mx-auto lg:mx-0">
            <div 
              className="prose prose-lg prose-slate max-w-[65ch] w-full
                         prose-headings:font-display-lg prose-headings:text-writtenly-navy prose-headings:font-bold
                         prose-p:text-on-surface-variant prose-p:leading-[1.8]
                         prose-a:text-writtenly-orange prose-a:no-underline hover:prose-a:underline
                         prose-blockquote:border-l-writtenly-orange prose-blockquote:bg-surface-container-low/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium
                         prose-img:rounded-2xl prose-img:shadow-md
                         prose-ul:list-disc prose-ol:list-decimal
                         prose-li:marker:text-writtenly-navy/50
                         prose-hr:border-outline-variant/30
                         marker:text-writtenly-orange"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            <AuthorProfile author={blog.author} />
          </main>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block relative">
            <TableOfContents />
          </aside>
        </div>

        <RelatedArticles articles={articlesToShow} />
      </article>

      <Newsletter />
    </>
  );
}
