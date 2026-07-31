import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  inverted?: boolean;
}

export function Breadcrumbs({ items, className = '', inverted = false }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-medium mb-6 ${inverted ? 'text-white/70' : 'text-on-surface-variant/80'} ${className}`}>
      <ol className="flex items-center gap-2 m-0 p-0 list-none flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className={`truncate max-w-[200px] md:max-w-none ${inverted ? 'text-white' : 'text-primary'}`} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={`transition-colors underline-offset-4 hover:underline ${inverted ? 'hover:text-white' : 'hover:text-primary'}`}>
                    {item.label}
                  </Link>
                  <ChevronRight size={14} className={inverted ? 'text-white/40' : 'text-outline-variant/60'} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
