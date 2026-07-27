import React from 'react';

export interface QuickFactsProps {
  data: {
    title?: string;
    facts?: { fact: string }[];
  };
}

export function QuickFacts({ data }: QuickFactsProps) {
  if (!data?.facts || data.facts.length === 0) return null;

  return (
    <div className="my-8 max-w-[75ch] mx-auto lg:mx-0 p-6 rounded-2xl bg-secondary-container/20 border border-secondary-container/30">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary-container text-[28px]">bolt</span>
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface m-0">
          {data.title || 'Quick Facts'}
        </h3>
      </div>
      <ul className="space-y-4 m-0 p-0">
        {data.facts.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary-container text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span className="font-body-xl text-body-xl font-medium text-on-surface-variant">
              {item.fact}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
