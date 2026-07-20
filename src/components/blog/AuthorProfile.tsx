import { Author } from '@/data/mockBlogs';
import Link from 'next/link';
import { ImageWithFallback } from '../ui/ImageWithFallback';

export function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="bg-surface-container-low/50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 border border-outline-variant/30 mt-16 mb-12 text-center md:text-left">
      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
        <ImageWithFallback 
          src={author.avatarUrl} 
          alt={author.name} 
          className="rounded-full object-cover shadow-md"
          fill
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <span className="font-label-md text-label-md font-bold text-writtenly-orange mb-2 tracking-wider uppercase">Written By</span>
        <h3 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold mb-1">
          {author.name}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant/80 mb-4 font-bold">
          {author.role}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6 max-w-2xl">
          {author.name} brings years of expertise in digital strategy, consistently helping brands find their unique voice and scale their organic presence. They are passionate about the intersection of human creativity and technological innovation.
        </p>
        <Link 
          href="#"
          className="inline-flex items-center justify-center md:justify-start gap-1 font-label-md text-label-md font-bold text-writtenly-navy hover:text-writtenly-orange transition-colors group"
        >
          View all articles by {author.name}
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
