import React from 'react';
import { Author } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function AboutAuthor({ data }: { data: Author | null }) {
  if (!data || !data.name) return null;

  const { name, role, bio, avatarUrl } = data;

  return (
    <section className="my-10 max-w-[75ch] w-full bg-surface-container-low rounded-xl border border-outline-variant flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 p-6 md:p-8 text-center sm:text-left">
      <div className="w-16 h-16 relative rounded-full overflow-hidden border border-outline-variant shrink-0">
        <ImageWithFallback 
          alt={name} 
          src={avatarUrl}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div>
          <h3 className="font-headline-md text-lg text-primary mb-0.5">{name}</h3>
          <p className="text-on-surface-variant font-medium text-xs uppercase tracking-wider">{role}</p>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{bio}</p>
      </div>
    </section>
  );
}
