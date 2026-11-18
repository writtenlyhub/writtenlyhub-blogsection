import React from 'react';
import { AuthorProfile } from '@/types/blog';
import AnimatedMetric from '@/components/ui/AnimatedMetric';

interface AuthorStatsProps {
  author: AuthorProfile;
}

export function AuthorStats({ author }: AuthorStatsProps) {
  const {
    totalArticles,
    blogsCount,
    newsCount,
    readersReached,
  } = author;

  const metrics = [
    { value: String(totalArticles), label: 'Total Published Articles' },
    { value: String(blogsCount), label: 'In-Depth Blogs & Guides' },
    { value: String(newsCount), label: 'Industry News & Briefs' },
    { value: readersReached, label: 'Global Readers Reached' },
  ];

  return (
    <section className="w-full max-w-container-max mx-auto px-gutter my-8 md:my-12">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-primary-container rounded-2xl border border-white/10 py-10 shadow-lg">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center px-4 ${
              index !== metrics.length - 1 && index !== 1 ? 'md:border-r border-white/10' : ''
            } ${index === 1 ? 'md:border-r border-white/10' : ''} ${index > 1 ? 'mt-8 md:mt-0' : ''}`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <AnimatedMetric value={metric.value} className="text-3xl md:text-5xl font-extrabold text-white" />
            </div>
            <span className="font-bold text-[10px] md:text-xs text-surface-dim uppercase tracking-widest">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
