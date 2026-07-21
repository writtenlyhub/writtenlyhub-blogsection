import React from 'react';

export function ArticleContent({ children }: { children: React.ReactNode }) {
  return (
    <article className="w-full prose max-w-none prose-p:max-w-[72ch] prose-p:text-[18px] prose-p:leading-[1.8] prose-p:mb-6 prose-headings:max-w-[72ch] prose-headings:scroll-mt-header-height prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3">
      {children}
    </article>
  );
}
