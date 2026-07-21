import React from 'react';
import { QuoteData } from '@/types/blog';

export function Quote({ data }: { data: QuoteData | null }) {
  if (!data || !data.quote) return null;

  const { quote, label = 'Expert Insight' } = data;

  return (
    <blockquote className="my-10 max-w-[72ch] w-full p-6 md:p-8 bg-writtenly-navy text-white rounded-2xl relative overflow-hidden shadow-md border-none">
      <div className="absolute top-4 left-4 opacity-50 z-0 text-writtenly-orange">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H4.01697C3.46468 8 3.01697 8.44772 3.01697 9V12C3.01697 12.5523 2.56925 13 2.01697 13H0.0169678V5H10.017V15C10.017 18.3137 7.3307 21 4.01697 21H2.01697Z"></path>
        </svg>
      </div>
      <p className="font-medium italic text-2xl leading-snug m-0 relative z-10 font-headline-md">
        &quot;{quote}&quot;
      </p>
      {label && (
        <div className="mt-6 flex items-center gap-3 relative z-10">
          <div className="w-10 h-1 bg-secondary-container rounded-full"></div>
          <span className="font-bold text-sm tracking-widest uppercase">{label}</span>
        </div>
      )}
    </blockquote>
  );
}
