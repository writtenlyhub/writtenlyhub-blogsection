'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { SuccessStoryCategory } from '@/payload-types';

interface SuccessStoryCategoryFilterProps {
  categories: SuccessStoryCategory[];
  mobileVisibleCount?: number;
}

const PILL_BASE =
  'inline-flex items-center justify-center rounded-full font-label-md text-label-md transition-all shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-writtenly-orange focus-visible:ring-offset-1';
const PILL_ACTIVE = 'bg-writtenly-navy text-white font-bold';
const PILL_INACTIVE =
  'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-writtenly-navy/50 hover:text-writtenly-navy';

export function SuccessStoryCategoryFilter({ categories, mobileVisibleCount = 6 }: SuccessStoryCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') || 'all';

  const [sheetOpen, setSheetOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const mobileVisible = Math.min(mobileVisibleCount, categories.length);
  const moreCategories = categories.slice(mobileVisible);
  const hasMore = moreCategories.length > 0;
  const moreIsActive = moreCategories.some((c) => c.slug === active);

  const openSheet = useCallback(() => {
    setSheetOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeSheet = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let mounted = true;
    const onClose = () => {
      if (!mounted) return;
      setSheetOpen(false);
      moreButtonRef.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => {
      mounted = false;
      dialog.removeEventListener('close', onClose);
    };
  }, []);

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) closeSheet();
    },
    [closeSheet],
  );

  const handleSelect = useCallback(
    (slug: string, fromSheet = false) => {
      if (fromSheet) closeSheet();
      const params = new URLSearchParams(searchParams.toString());
      if (slug === 'all') {
        params.delete('category');
      } else {
        params.set('category', slug);
      }
      params.delete('page');
      router.push(`/success-stories?${params.toString()}`, { scroll: false });
    },
    [closeSheet, searchParams, router],
  );

  return (
    <>
      <nav aria-label="Category pages" className="sr-only">
        <ul>
          {categories.map((cat) => (
            <li key={`seo-${cat.id}`}>
              <a href={`/success-stories?category=${cat.slug}`}>{cat.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="hidden md:flex flex-wrap items-center justify-center gap-3 w-full mb-8"
        role="group"
        aria-label="Filter stories by category"
      >
        <button
          onClick={() => handleSelect('all')}
          aria-pressed={active === 'all'}
          className={`${PILL_BASE} px-5 py-2 min-h-[44px] ${active === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
        >
          All Stories
        </button>
        {categories.map((cat) => (
          <button
            key={`desk-${cat.id}`}
            onClick={() => handleSelect(cat.slug || '')}
            aria-pressed={active === cat.slug}
            className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div
        className="flex md:hidden flex-wrap justify-center gap-2 w-full mb-6"
        role="group"
        aria-label="Filter stories by category"
      >
        <button
          onClick={() => handleSelect('all')}
          aria-pressed={active === 'all'}
          className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
        >
          All
        </button>

        {categories.slice(0, mobileVisible).map((cat) => (
          <button
            key={`mob-${cat.id}`}
            onClick={() => handleSelect(cat.slug || '')}
            aria-pressed={active === cat.slug}
            className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
          >
            {cat.name}
          </button>
        ))}

        {hasMore && (
          <button
            ref={moreButtonRef}
            onClick={openSheet}
            aria-expanded={sheetOpen}
            aria-haspopup="dialog"
            aria-controls="category-bottom-sheet"
            className={`${PILL_BASE} px-4 py-2 min-h-[44px] gap-1 ${
              moreIsActive
                ? 'bg-writtenly-navy/10 text-writtenly-navy border border-writtenly-navy font-bold'
                : PILL_INACTIVE
            }`}
          >
            <span aria-hidden="true">+</span>
            <span>More</span>
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        id="category-bottom-sheet"
        aria-label="All categories"
        className={[
          'fixed m-0 p-0 w-full max-w-none border-0 outline-none',
          'h-full max-h-none bg-transparent',
          'backdrop:bg-on-surface/40 backdrop:backdrop-blur-[3px]',
        ].join(' ')}
        onClick={handleDialogClick}
      >
        <div
          className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest rounded-t-[28px] shadow-2xl flex flex-col max-h-[80dvh]"
          role="document"
        >
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-outline-variant" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-writtenly-navy font-bold">
              All Categories
            </h2>
            <button
              onClick={closeSheet}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-writtenly-orange"
              aria-label="Close categories"
            >
              <X className="text-[20px] text-on-surface-variant" />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-6 py-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelect('all', true)}
              aria-pressed={active === 'all'}
              className={`${PILL_BASE} px-4 py-2 min-h-[44px] w-full ${active === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={`sheet-${cat.id}`}
                onClick={() => handleSelect(cat.slug || '', true)}
                aria-pressed={active === cat.slug}
                className={`${PILL_BASE} px-4 py-2 min-h-[44px] w-full ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="shrink-0 h-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </dialog>
    </>
  );
}
