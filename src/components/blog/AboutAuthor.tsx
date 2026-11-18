import React from 'react';
import Link from 'next/link';
import { Author } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function AboutAuthor({ data, className, layout = 'horizontal' }: { data: Author | null, className?: string, layout?: 'horizontal' | 'vertical' }) {
  if (!data || !data.name) return null;

  const { name, role, bio, avatarUrl, slug } = data;

  const authorLink = slug ? `/author/${slug}` : null;

  if (layout === 'vertical') {
    return (
      <section className={className || "w-full max-w-[75ch] bg-surface-container-low rounded-xl border border-outline-variant flex flex-col gap-4 p-5"}>
        <div className="flex items-center gap-4">
          {authorLink ? (
            <Link href={authorLink} className="group/avatar shrink-0">
              <div className="w-10 h-10 relative rounded-full overflow-hidden border border-outline-variant group-hover/avatar:border-secondary transition-colors">
                <ImageWithFallback alt={name} src={avatarUrl} fill className="object-cover" />
              </div>
            </Link>
          ) : (
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-outline-variant shrink-0">
              <ImageWithFallback alt={name} src={avatarUrl} fill className="object-cover" />
            </div>
          )}
          <div className="text-left">
            {authorLink ? (
              <Link href={authorLink} className="hover:text-secondary transition-colors">
                <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
              </Link>
            ) : (
              <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
            )}
            <p className="text-on-surface-variant font-medium text-[10px] uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed text-left">{bio}</p>
        {authorLink && (
          <Link
            href={authorLink}
            className="inline-flex items-center gap-1 font-label-md text-xs font-semibold text-secondary hover:underline transition-all mt-1"
          >
            <span>View Author Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </section>
    );
  }

  return (
    <section className={className || "w-full max-w-[75ch] bg-surface-container-low rounded-xl border border-outline-variant flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-5 sm:p-6 text-center sm:text-left"}>
      {authorLink ? (
        <Link href={authorLink} className="group/avatar shrink-0">
          <div className="w-12 h-12 relative rounded-full overflow-hidden border border-outline-variant group-hover/avatar:border-secondary transition-colors">
            <ImageWithFallback 
              alt={name} 
              src={avatarUrl}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-outline-variant shrink-0">
          <ImageWithFallback 
            alt={name} 
            src={avatarUrl}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <div>
          {authorLink ? (
            <Link href={authorLink} className="hover:text-secondary transition-colors">
              <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
            </Link>
          ) : (
            <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
          )}
          <p className="text-on-surface-variant font-medium text-[10px] uppercase tracking-wider">{role}</p>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{bio}</p>
        {authorLink && (
          <Link
            href={authorLink}
            className="inline-flex items-center gap-1 font-label-md text-xs font-semibold text-secondary hover:underline transition-all mt-3"
          >
            <span>Read more articles by {name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
