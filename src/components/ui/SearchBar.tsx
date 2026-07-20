import { InputHTMLAttributes } from 'react';

export function SearchBar(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline group-focus-within:text-writtenly-orange transition-colors">
          search
        </span>
      </div>
      <input
        className="w-full pl-12 pr-6 py-3 bg-white border border-outline-variant rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:border-writtenly-orange focus:ring-2 focus:ring-writtenly-orange/20 transition-all shadow-sm"
        type="text"
        placeholder="Search articles..."
        {...props}
      />
    </div>
  );
}
