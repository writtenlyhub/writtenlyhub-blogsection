import React from 'react';
import { MockContentNode } from '@/types/blog';
import { RichText } from '@/components/blog/RichText';

export interface ConclusionProps {
  title?: string;
  content: MockContentNode[];
}

export function Conclusion({ title = 'Conclusion', content }: ConclusionProps) {
  return (
    <>
      <h2 id="conclusion" className="text-3xl font-headline-lg font-bold text-primary mt-10 mb-4 scroll-mt-header-height">{title}</h2>
      <RichText content={content} />
    </>
  );
}
