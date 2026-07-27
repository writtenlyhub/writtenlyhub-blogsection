import React from 'react';
import { FAQItem } from '@/types/blog';

export interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export function FAQ({ data }: { data: FAQProps | null }) {
  if (!data || !data.items || data.items.length === 0) return null;
  const { title = 'Frequently Asked Questions', items } = data;

  return (
    <div>
      <h3 className="font-headline-lg text-headline-lg font-bold text-primary mb-8 text-center">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          return (
            <div key={index} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="w-full text-left px-4 py-3 font-headline-md text-headline-md font-bold text-writtenly-navy border-b border-outline-variant">
                <span>{item.question}</span>
              </div>
              <div>
                <p className="px-4 py-3 text-on-surface-variant font-body-xl text-body-xl whitespace-pre-wrap">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
