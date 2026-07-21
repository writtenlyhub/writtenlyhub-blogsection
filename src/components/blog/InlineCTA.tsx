import React from 'react';
import { CTAData } from '@/types/blog';
import { Button } from '@/components/ui/Button';

export function InlineCTA({ data }: { data: CTAData | null }) {
  if (!data || !data.title) return null;

  const { title, description, buttonText, buttonLink } = data;

  return (
    <div className="my-10 max-w-[72ch] w-full p-6 md:p-8 bg-writtenly-navy text-white rounded-2xl shadow-md border border-primary-container flex flex-col items-center justify-between gap-6">
      <div>
        <h3 className="font-headline-md text-xl md:text-2xl mb-4 text-white text-center">{title}</h3>
        <p className="text-base md:text-lg opacity-90 leading-relaxed m-0 text-center">
          {description}
        </p>
      </div>
      <div className="w-full text-center flex justify-center">
        <a href={buttonLink} className="no-underline">
          <Button variant="primary" className="text-base px-6 py-2.5 w-full md:w-auto">
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}
