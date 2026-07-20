import { InputHTMLAttributes } from 'react';

export function SearchBar(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-on-surface-variant/50 group-focus-within:text-writtenly-orange transition-colors text-[24px]">
          search
        </span>
      </div>
      <input
        className="w-full min-w-0 pl-14 pr-6 py-4 md:py-[18px] bg-white border border-outline-variant/40 rounded-full font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-writtenly-orange focus:ring-4 focus:ring-writtenly-orange/15 transition-all shadow-sm hover:shadow-md hover:border-writtenly-navy/30 placeholder:text-on-surface-variant/50 placeholder:truncate"
        type="text"
        placeholder="Search articles, topics, or guides..."
        {...props}
      />
    </div>
  );
}
