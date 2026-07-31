import React from 'react';
import { QuoteData } from '@/types/blog';
import { Quote as QuoteIcon } from 'lucide-react';

export function Quote({ data }: { data: QuoteData | null }) {
  if (!data || !data.quote) return null;

  const { quote, label = 'Expert Insight' } = data;

  return (
    <div className="max-w-[75ch] mx-auto lg:mx-0 my-8 flex gap-4">
      <QuoteIcon size={48} className="text-outline-variant/40 leading-none shrink-0 select-none -mt-2" />
      <div className="flex flex-col gap-4">
        <p className="font-body-xl text-body-xl italic text-on-surface-variant m-0">
          {quote}
        </p>
        {label && (
          <div className="font-bold text-on-surface text-base">
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </div>
        )}
      </div>
    </div>
  );
}
