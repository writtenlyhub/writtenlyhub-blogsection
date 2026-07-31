import React from 'react';
import { FAQItem } from '@/types/blog';
import { CircleHelp } from 'lucide-react';

export interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export function FAQ({ data }: { data: FAQProps | null }) {
  if (!data || !data.items || data.items.length === 0) return null;
  const { title = 'Frequently Asked Questions', items } = data;

  return (
    <div className="py-2">
      <hr className="mb-10 border-outline-variant" />
      <h3 className="font-headline-lg text-headline-lg font-bold text-primary mb-8 text-center">
        {title}
      </h3>
      <div className="flex flex-col">
        {items.map((item, index) => {
          return (
            <div key={index} className="mb-10 last:mb-0">
              <h4 className="font-headline-md text-headline-md font-bold text-writtenly-navy mb-3 flex items-start gap-2">
                <CircleHelp className="text-writtenly-orange text-[24px] select-none mt-0.5" />
                <span>{item.question}</span>
              </h4>
              <p className="text-on-surface-variant font-body-xl text-body-xl whitespace-pre-wrap pl-[32px]">
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="mt-10 border-outline-variant" />
    </div>
  );
}
