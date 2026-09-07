'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath?: string;
}

export function Pagination({ totalPages, currentPage, basePath = '/blog' }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${basePath}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 2) {
      end = Math.min(totalPages, 5);
    }
    if (currentPage >= totalPages - 1) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-16 mb-8">
      {currentPage > 1 && (
        <Link 
          href={createPageUrl(currentPage - 1)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant/40 text-on-surface-variant hover:border-writtenly-navy/50 hover:text-writtenly-navy transition-colors bg-white shadow-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="text-[20px]" />
        </Link>
      )}

      {visiblePages[0] > 1 && (
        <>
          <Link 
            href={createPageUrl(1)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant/40 text-on-surface-variant hover:border-writtenly-navy/50 hover:text-writtenly-navy transition-colors bg-white shadow-sm font-label-md text-label-md"
          >
            1
          </Link>
          {visiblePages[0] > 2 && <span className="font-label-md text-label-md text-on-surface-variant px-1">...</span>}
        </>
      )}

      {visiblePages.map(page => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors shadow-sm font-label-md text-label-md ${
            page === currentPage
              ? 'bg-writtenly-navy text-white font-bold border-writtenly-navy'
              : 'border-outline-variant/40 text-on-surface-variant hover:border-writtenly-navy/50 hover:text-writtenly-navy bg-white'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="font-label-md text-label-md text-on-surface-variant px-1">...</span>
          )}
          <Link 
            href={createPageUrl(totalPages)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant/40 text-on-surface-variant hover:border-writtenly-navy/50 hover:text-writtenly-navy transition-colors bg-white shadow-sm font-label-md text-label-md"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link 
          href={createPageUrl(currentPage + 1)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant/40 text-on-surface-variant hover:border-writtenly-navy/50 hover:text-writtenly-navy transition-colors bg-white shadow-sm"
          aria-label="Next page"
        >
          <ChevronRight className="text-[20px]" />
        </Link>
      )}
    </div>
  );
}
