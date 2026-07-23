import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found | WrittenlyHub',
  description: 'The page you were looking for could not be found. Browse our articles or return to the homepage.',
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Branded 404 page for the WrittenlyHub blog.
 * Matches the existing design system — typography, colors, spacing, and button styles.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-gutter py-section-gap">
      <div className="max-w-lg w-full text-center">

        {/* Large 404 */}
        <div className="mb-6 select-none" aria-hidden="true">
          <span className="font-display-lg text-[clamp(80px,15vw,140px)] font-bold text-surface-container-highest leading-none tracking-tighter block">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-headline-lg text-headline-lg text-writtenly-navy font-bold tracking-tight mb-4">
          Page not found
        </h1>

        {/* Description */}
        <p className="font-body-lg text-body-lg text-on-surface-variant/80 leading-[1.7] mb-10 max-w-sm mx-auto">
          The article or page you were looking for has moved, been removed,
          or never existed. Let&#39;s get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/" aria-label="Return to the WrittenlyHub homepage">
            <Button variant="primary">
              <span className="material-symbols-outlined text-[18px] mr-1.5" aria-hidden="true">home</span>
              Go to Homepage
            </Button>
          </Link>

          <Link href="/blog" aria-label="Browse all WrittenlyHub articles">
            <Button variant="outline">
              <span className="material-symbols-outlined text-[18px] mr-1.5" aria-hidden="true">article</span>
              Browse All Articles
            </Button>
          </Link>
        </div>

        {/* Subtle decorative hint */}
        <p className="mt-12 font-label-md text-label-md text-outline tracking-widest uppercase">
          WrittenlyHub · Blog
        </p>

      </div>
    </div>
  );
}
