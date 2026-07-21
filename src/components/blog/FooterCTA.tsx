import React from 'react';
import { CTAData } from '@/types/blog';
import { Button } from '@/components/ui/Button';

export function FooterCTA({ data }: { data: CTAData | null }) {
  if (!data || !data.title) return null;

  const { title, description, buttonText, buttonLink } = data;

  return (
    <div className="my-10 max-w-[72ch] w-full bg-writtenly-navy text-white rounded-2xl p-6 md:p-8 shadow-md border border-primary-container flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h4 className="font-headline-md text-xl md:text-2xl mb-2">{title}</h4>
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <a href={buttonLink} className="w-full no-underline">
          <Button variant="primary" className="text-sm px-6 py-2 w-full text-center">
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}
