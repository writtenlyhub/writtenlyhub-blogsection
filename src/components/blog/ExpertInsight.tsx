import React from 'react';

export interface ExpertInsightProps {
  data: {
    quote?: string;
    label?: string;
  };
}

export function ExpertInsight({ data }: ExpertInsightProps) {
  if (!data?.quote) return null;

  return (
    <div className="my-10 max-w-[75ch] mx-auto lg:mx-0 p-8 rounded-2xl bg-surface-container-high border-l-4 border-primary shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
        <span className="font-bold text-primary text-sm uppercase tracking-widest">{data.label || 'Expert Insight'}</span>
      </div>
      <blockquote className="text-xl md:text-2xl font-medium text-on-surface leading-relaxed italic m-0">
        &quot;{data.quote}&quot;
      </blockquote>
    </div>
  );
}
