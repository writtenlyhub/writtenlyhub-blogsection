import React from 'react';
import { Author } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function AboutAuthor({ data, className, layout = 'horizontal' }: { data: Author | null, className?: string, layout?: 'horizontal' | 'vertical' }) {
  if (!data || !data.name) return null;

  const { name, role, bio, avatarUrl } = data;

  if (layout === 'vertical') {
    return (
      <section className={className || "w-full max-w-[75ch] bg-surface-container-low rounded-xl border border-outline-variant flex flex-col gap-4 p-5"}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-outline-variant shrink-0">
            <ImageWithFallback alt={name} src={avatarUrl} fill className="object-cover" />
          </div>
          <div className="text-left">
            <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
            <p className="text-on-surface-variant font-medium text-[10px] uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed text-left">{bio}</p>
      </section>
    );
  }

  return (
    <section className={className || "w-full max-w-[75ch] bg-surface-container-low rounded-xl border border-outline-variant flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-5 sm:p-6 text-center sm:text-left"}>
      <div className="w-12 h-12 relative rounded-full overflow-hidden border border-outline-variant shrink-0">
        <ImageWithFallback 
          alt={name} 
          src={avatarUrl}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div>
          <h3 className="font-headline-md text-base text-primary mb-0.5">{name}</h3>
          <p className="text-on-surface-variant font-medium text-[10px] uppercase tracking-wider">{role}</p>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{bio}</p>
      </div>
    </section>
  );
}
