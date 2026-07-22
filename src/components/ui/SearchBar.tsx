'use client';

import { InputHTMLAttributes, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar(props: InputHTMLAttributes<HTMLInputElement>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    params.delete('page'); // reset pagination on search
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-on-surface-variant/50 group-focus-within:text-writtenly-orange transition-colors text-[24px]">
          search
        </span>
      </div>
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full min-w-0 pl-14 pr-6 py-4 md:py-[18px] bg-white border border-outline-variant/40 rounded-full font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-writtenly-orange focus:ring-4 focus:ring-writtenly-orange/15 transition-all shadow-sm hover:shadow-md hover:border-writtenly-navy/30 placeholder:text-on-surface-variant/50 placeholder:truncate"
        type="search"
        placeholder="Search articles, topics, or guides..."
        {...props}
      />
    </form>
  );
}
