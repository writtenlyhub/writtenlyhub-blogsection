import React from 'react';
import { Brain } from 'lucide-react';

export interface ExpertInsightProps {
  data: {
    quote?: string;
    label?: string;
  };
}

export function ExpertInsight({ data }: ExpertInsightProps) {
  if (!data?.quote) return null;

  return (
    <div className="my-8 max-w-[75ch] mx-auto lg:mx-0 p-6 rounded-2xl bg-surface-container-high border-l-4 border-primary shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-primary text-[24px]" />
        <span className="text-sm font-bold tracking-wide text-primary">{data.label || 'Expert Insight'}</span>
      </div>
      <p className="text-lg md:text-xl text-on-surface-variant whitespace-pre-wrap italic mb-2">
        &quot;{data.quote}&quot;
      </p>
    </div>
  );
}
