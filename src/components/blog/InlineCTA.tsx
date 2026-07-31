'use client';

import React from 'react';
import { CTAData } from '@/types/blog';
import { Button } from '@/components/ui/Button';

export function InlineCTA({ data }: { data: CTAData | null }) {
  if (!data || !data.title) return null;

  const { title, description, buttonText, buttonLink } = data;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = buttonLink?.toLowerCase() || '';
    const text = buttonText?.toLowerCase() || '';
    
    // Intercept if link or text mentions subscribe/newsletter
    if (
      link.includes('subscribe') || 
      link.includes('newsletter') || 
      text.includes('subscribe') || 
      text.includes('newsletter') ||
      link === '#' ||
      link === ''
    ) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-newsletter-modal'));
    }
  };
  return (
    <div className="w-full">
      <div data-newsletter-cta="true" className="w-full max-w-4xl mx-auto p-8 md:p-12 bg-writtenly-navy text-white rounded-2xl shadow-md border border-primary-container flex flex-col items-center justify-between gap-6">
        <div>
          <h3 className="font-headline-md text-xl md:text-3xl mb-4 text-white text-center">{title}</h3>
          <p className="text-base md:text-xl opacity-90 leading-relaxed m-0 text-center max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        <div className="w-full text-center flex justify-center mt-2">
          <a href={buttonLink} onClick={handleClick} className="no-underline">
            <Button variant="primary" className="text-base md:text-lg px-8 py-3 w-full md:w-auto">
              {buttonText}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
