'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { UI_Category as Category } from '@/types/blog';

interface CategoryFilterProps {
  categories: Category[];
  /**
   * Number of categories to show in the mobile two-row grid before "+ More".
   * Tune this so chips fill ~2 rows at 360–390px.
   * Default: 6 (fills ~2 balanced rows for typical category label lengths).
   */
  mobileVisibleCount?: number;
}

// Shared pill style helpers
const PILL_BASE =
  'inline-flex items-center justify-center rounded-full font-label-md text-label-md transition-all shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-writtenly-orange focus-visible:ring-offset-1';
const PILL_ACTIVE = 'bg-writtenly-navy text-white font-bold shadow-sm';
const PILL_INACTIVE =
  'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-writtenly-navy/50 hover:text-writtenly-navy shadow-sm';

export function CategoryFilter({ categories, mobileVisibleCount = 6 }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') || 'all';

  const [sheetOpen, setSheetOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Mobile: show first N categories in the two-row grid; rest go into the sheet
  const mobileVisible = Math.min(mobileVisibleCount, categories.length);
  const moreCategories = categories.slice(mobileVisible);
  const hasMore = moreCategories.length > 0;
  const moreIsActive = moreCategories.some((c) => c.slug === active);

  const openSheet = useCallback(() => {
    setSheetOpen(true);
    // showModal() gives us focus-trap + Escape + backdrop for free
    dialogRef.current?.showModal();
  }, []);

  const closeSheet = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Sync React state when dialog closes via any mechanism (Escape, backdrop, closeSheet).
  // Guard with a `mounted` flag so we never call setState during unmount —
  // the native dialog fires its "close" event synchronously during teardown
  // which would otherwise trigger the "state update before mount" warning.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let mounted = true;
    const onClose = () => {
      if (!mounted) return;
      setSheetOpen(false);
      // Return focus to the trigger button
      moreButtonRef.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => {
      mounted = false;
      dialog.removeEventListener('close', onClose);
    };
  }, []);

  // Close when clicking the backdrop (the <dialog> element itself)
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
      params.delete('page'); // Reset pagination on category change
      router.push(`/blog?${params.toString()}`, { scroll: false });
    },
    [closeSheet, searchParams, router],
  );

  return (
    <>
      {/*
        ── SEO anchor list ──────────────────────────────────────────────
        Always in the DOM as real <a> elements so crawlers index all
        category pages. Visually hidden but readable by screen readers.
        ─────────────────────────────────────────────────────────────── */}
      <nav aria-label="Category pages" className="sr-only">
        <ul>
          {categories.map((cat) => (
            <li key={`seo-${cat.id}`}>
              <a href={`/blog?category=${cat.slug}`}>{cat.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/*
        ── Desktop pill row ─────────────────────────────────────────────
        All categories visible, horizontally wrapped. Unchanged layout.
        ─────────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex flex-wrap items-center justify-center gap-3 w-full mb-8"
        role="group"
        aria-label="Filter articles by category"
      >
        <button
          onClick={() => handleSelect('all')}
          aria-pressed={active === 'all'}
          className={`${PILL_BASE} px-5 py-2 min-h-[44px] ${active === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={`desk-${cat.id}`}
            onClick={() => handleSelect(cat.slug)}
            aria-pressed={active === cat.slug}
            className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/*
        ── Mobile two-row category grid ──────────────────────────────────
        Uses flex-wrap + justify-center so chips form natural rows and
        remain center-aligned at every viewport width (320–390px).
        The "+ More" chip is the last item in the same flex container so
        it flows to the end of whichever row it lands on — no separate
        row, no horizontal scroll.
        ─────────────────────────────────────────────────────────────── */}
      <div
        className="flex md:hidden flex-wrap justify-center gap-2 w-full mb-6"
        role="group"
        aria-label="Filter articles by category"
      >
        {/* All */}
        <button
          onClick={() => handleSelect('all')}
          aria-pressed={active === 'all'}
          className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
        >
          All
        </button>

        {/* Visible categories — first mobileVisible items fill ~2 rows */}
        {categories.slice(0, mobileVisible).map((cat) => (
          <button
            key={`mob-${cat.id}`}
            onClick={() => handleSelect(cat.slug)}
            aria-pressed={active === cat.slug}
            className={`${PILL_BASE} px-4 py-2 min-h-[44px] ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
          >
            {cat.title}
          </button>
        ))}

        {/* "+ More" — flows naturally to end of row 2 */}
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


      {/*
        ── Mobile bottom sheet ──────────────────────────────────────────
        Native <dialog> gives: focus trap, Escape key, backdrop, ARIA.
        Content is always in the DOM for crawlers (dialog is just hidden
        via user-agent stylesheet when closed).
        ─────────────────────────────────────────────────────────────── */}
      <dialog
        ref={dialogRef}
        id="category-bottom-sheet"
        aria-label="All categories"
        className={[
          // Reset browser dialog defaults
          'fixed m-0 p-0 w-full max-w-none border-0 outline-none',
          // Full-screen so we can control the backdrop and panel ourselves
          'h-full max-h-none bg-transparent',
          // Backdrop
          'backdrop:bg-on-surface/40 backdrop:backdrop-blur-[3px]',
        ].join(' ')}
        onClick={handleDialogClick}
      >
        {/* Panel slides up from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest rounded-t-[28px] shadow-2xl flex flex-col max-h-[80dvh]"
          role="document"
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-outline-variant" aria-hidden="true" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-writtenly-navy font-bold">
              All Categories
            </h2>
            <button
              onClick={closeSheet}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-writtenly-orange"
              aria-label="Close categories"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                close
              </span>
            </button>
          </div>

          {/* Category grid — scrollable */}
          <div className="overflow-y-auto overscroll-contain px-6 py-5 grid grid-cols-2 gap-2">
            {/* All */}
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
                onClick={() => handleSelect(cat.slug, true)}
                aria-pressed={active === cat.slug}
                className={`${PILL_BASE} px-4 py-2 min-h-[44px] w-full ${active === cat.slug ? PILL_ACTIVE : PILL_INACTIVE}`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Safe-area spacer for home-indicator on iOS */}
          <div className="shrink-0 h-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </dialog>
    </>
  );
}
