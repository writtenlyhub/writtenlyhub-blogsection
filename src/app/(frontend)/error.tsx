'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { HelpCircle, RefreshCcw, Home } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js App Router error boundary for the frontend route group.
 * Matches the WrittenlyHub design system — never exposes stack traces.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error monitoring service in production
    console.error('[WrittenlyHub Error]', error.digest ?? error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-gutter py-section-gap">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8">
          <HelpCircle className="text-[40px] text-writtenly-orange" />
        </div>

        {/* Heading */}
        <h1 className="font-display-lg text-display-lg text-writtenly-navy font-bold tracking-tight mb-4">
          Something went wrong
        </h1>

        {/* Explanation */}
        <p className="font-body-lg text-body-lg text-on-surface-variant/80 leading-[1.7] mb-10 max-w-sm mx-auto">
          We hit an unexpected snag. This is on us — your content is safe.
          Please try again or head back to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            variant="primary"
            onClick={reset}
            aria-label="Retry loading the current page"
          >
            <RefreshCcw className="text-[18px] mr-1.5" />
            Try Again
          </Button>

          <Link href="/" aria-label="Return to the WrittenlyHub homepage">
            <Button variant="outline">
              <Home className="text-[18px] mr-1.5" />
              Go to Homepage
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
