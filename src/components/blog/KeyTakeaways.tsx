import React from 'react';
import { KeyTakeawaysData } from '@/types/blog';

export function KeyTakeaways({ data }: { data: KeyTakeawaysData | null }) {
  if (!data || !data.items || data.items.length === 0) return null;

  const { title = 'Key Takeaways', items } = data;

  return (
    <div className="my-10 max-w-[72ch] px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6 bg-surface-container-low rounded-xl border border-outline-variant shadow-sm h-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white border border-outline-variant flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-writtenly-orange text-[20px]">star</span>
        </div>
        <h3 className="!text-xl font-bold text-primary !m-0 font-headline-md">{title}</h3>
      </div>
      <ul className="space-y-6 !m-0 pl-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-writtenly-orange shrink-0 mt-2"></span>
            <p className="!m-0 !text-base text-on-surface-variant leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
