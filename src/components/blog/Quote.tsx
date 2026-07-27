import React from 'react';
import { QuoteData } from '@/types/blog';

export function Quote({ data }: { data: QuoteData | null }) {
  if (!data || !data.quote) return null;

  const { quote, label = 'Expert Insight' } = data;

  return (
    <blockquote className="max-w-[75ch] mx-auto lg:mx-0 w-full p-6 bg-writtenly-navy text-white rounded-2xl relative overflow-hidden shadow-md border-l-4 border-writtenly-orange">
      <p className="font-medium italic font-headline-lg text-headline-lg m-0 relative z-10">
        &quot;{quote}&quot;
      </p>
      {label && (
        <div className="mt-6 flex items-center gap-3 relative z-10">
          <div className="w-10 h-1 bg-secondary-container rounded-full"></div>
          <span className="font-bold font-label-sm text-label-sm">{label}</span>
        </div>
      )}
    </blockquote>
  );
}
