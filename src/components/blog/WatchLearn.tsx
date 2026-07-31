import React from 'react';
import { CTAData } from '@/types/blog';
import { Button } from '@/components/ui/Button';
import { MonitorPlay } from 'lucide-react';

export function WatchLearn({ data }: { data: CTAData | null }) {
  if (!data || !data.title) return null;

  const { title, description, buttonText, buttonLink } = data;

  return (
    <section className="max-w-[75ch] mx-auto lg:mx-0 w-full p-6 bg-surface-container-low rounded-2xl border border-outline-variant flex flex-col sm:flex-row items-start gap-4 md:gap-5">
      <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center shrink-0">
        <MonitorPlay className="text-error text-[28px]" />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="font-headline-md text-lg font-bold text-primary m-0">{title}</h3>
          <p className="text-on-surface-variant font-body-xl text-base m-0 leading-relaxed">{description}</p>
        </div>
        <div className="mt-1">
          <a href={buttonLink} className="no-underline block w-full md:w-auto">
            <Button variant="primary" className="text-sm px-6 py-2.5 w-full md:w-fit">
              {buttonText}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
