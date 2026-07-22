import React from 'react';

export function ArticleContent({ children }: { children: React.ReactNode }) {
  return (
    <article className="w-full">
      {children}
    </article>
  );
}
