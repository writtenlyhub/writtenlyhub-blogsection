import React from 'react';
import { CTAData } from '@/types/blog';
import { Button } from '@/components/ui/Button';

export function WatchLearn({ data }: { data: CTAData | null }) {
  if (!data || !data.title) return null;

  const { title, description, buttonText, buttonLink } = data;

  return (
    <section className="my-10 max-w-[75ch] mx-auto lg:mx-0 w-full p-6 md:p-8 bg-surface-container-low rounded-2xl border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-surface-container-highest rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-error text-3xl">smart_display</span>
        </div>
        <div>
          <h3 className="font-headline-md text-xl md:text-2xl text-primary mb-2">{title}</h3>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="shrink-0 w-full md:w-auto">
        <a href={buttonLink} className="no-underline w-full">
          <Button variant="primary" className="text-base px-6 py-2.5 w-full">
            {buttonText}
          </Button>
        </a>
      </div>
    </section>
  );
}
