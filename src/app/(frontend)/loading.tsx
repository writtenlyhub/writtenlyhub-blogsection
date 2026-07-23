/**
 * Next.js loading.tsx for the frontend route group.
 *
 * Renders skeleton placeholders that closely mirror the homepage/archive layout:
 *  - Hero masthead skeleton
 *  - Search bar skeleton
 *  - Category filter pill skeletons
 *  - Hero card skeleton
 *  - Grid of blog card skeletons
 *
 * Uses only design-system tokens so no style drift from the live pages.
 */
export default function LoadingPage() {
  return (
    <div className="w-full animate-pulse" aria-busy="true" aria-label="Loading content…">

      {/* ── Hero Section Skeleton ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden pb-8 md:pb-12">
        <div className="w-full px-gutter pt-12 md:pt-16 max-w-container-max mx-auto flex flex-col items-center text-center pb-4 md:pb-6">

          {/* Masthead title */}
          <div className="h-10 md:h-14 bg-surface-container-high rounded-2xl w-64 md:w-96 mx-auto mb-4" />
          {/* Subtitle */}
          <div className="h-4 bg-surface-container-high rounded-full w-80 md:w-[480px] mx-auto mb-2" />
          <div className="h-4 bg-surface-container-high rounded-full w-56 md:w-80 mx-auto mb-10" />

          {/* Category filter pills */}
          <div className="flex gap-2 flex-wrap justify-center mb-6 w-full max-w-2xl">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 rounded-full bg-surface-container-high"
                style={{ width: `${60 + (i % 3) * 20}px` }}
              />
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full max-w-container-max mx-auto">
            <div className="h-12 bg-surface-container-high rounded-xl w-full" />
          </div>
        </div>

        {/* ── Hero Card Skeleton ──────────────────────────────────────────── */}
        <div className="w-full px-gutter max-w-container-max mx-auto mt-6">
          <div className="flex flex-col lg:flex-row bg-surface-container-high rounded-3xl overflow-hidden border border-outline-variant/40 min-h-[280px] lg:min-h-[360px]">
            {/* Image placeholder */}
            <div className="aspect-[2/1] lg:aspect-auto lg:h-auto lg:w-[60%] shrink-0 bg-surface-container-highest" />
            {/* Text placeholder */}
            <div className="p-6 md:p-8 lg:p-10 lg:w-[40%] flex flex-col justify-center gap-4">
              <div className="h-4 bg-surface-container-highest rounded-full w-20" />
              <div className="space-y-2">
                <div className="h-6 bg-surface-container-highest rounded-lg w-full" />
                <div className="h-6 bg-surface-container-highest rounded-lg w-4/5" />
              </div>
              <div className="h-3.5 bg-surface-container rounded-full w-40" />
              <div className="space-y-2 mt-2">
                <div className="h-3 bg-surface-container rounded-full w-full" />
                <div className="h-3 bg-surface-container rounded-full w-11/12" />
                <div className="h-3 bg-surface-container rounded-full w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog Cards Grid Skeleton ──────────────────────────────────────── */}
      <section className="w-full px-gutter py-section-gap max-w-container-max mx-auto">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/30">
          <div className="h-6 bg-surface-container-high rounded-lg w-36" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </section>

    </div>
  );
}

/** Reusable skeleton that mirrors the BlogCard dimensions */
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/60 overflow-hidden">
      {/* Image */}
      <div className="aspect-[3/2] bg-surface-container-highest shrink-0" />
      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="h-4 bg-surface-container-high rounded-full w-20" />
        <div className="space-y-2">
          <div className="h-5 bg-surface-container-high rounded-lg w-full" />
          <div className="h-5 bg-surface-container-high rounded-lg w-4/5" />
        </div>
        <div className="h-3.5 bg-surface-container rounded-full w-36" />
        <div className="space-y-1.5 mt-1">
          <div className="h-3 bg-surface-container rounded-full w-full" />
          <div className="h-3 bg-surface-container rounded-full w-11/12" />
          <div className="h-3 bg-surface-container rounded-full w-2/3" />
        </div>
        <div className="mt-3 h-8 rounded-full bg-surface-container-high w-28" />
      </div>
    </div>
  );
}
