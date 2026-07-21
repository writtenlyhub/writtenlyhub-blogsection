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
    <div className="mb-16">
      <h3 className="text-3xl font-headline-lg font-bold text-primary mb-8 text-center">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          return (
            <div key={index} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="w-full text-left px-4 py-3 font-headline-md text-xl md:text-2xl font-bold text-writtenly-navy border-b border-outline-variant">
                <span>{item.question}</span>
              </div>
              <div>
                <div className="px-4 py-3 text-on-surface-variant leading-relaxed text-lg">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
