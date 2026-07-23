'use client';

import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export function PreviewBanner() {
  const pathname = usePathname();
  const exitUrl = `/api/preview?redirect=${encodeURIComponent(pathname || '/')}`;

  return (
    <div className="w-full bg-writtenly-navy text-white px-gutter py-3 flex items-center justify-between text-sm z-50 sticky top-0" role="alert">
      <div className="max-w-container-max mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-writtenly-orange text-lg" aria-hidden="true">visibility</span>
          <span className="font-medium">You are previewing an unpublished draft.</span>
        </div>
        <a href={exitUrl} aria-label="Exit Preview Mode">
          <Button variant="outline" className="!py-1.5 !px-4 !text-[12px] !bg-transparent !text-white !border-white/30 hover:!border-white hover:!bg-white/10 hover:!text-white">
            Exit Preview
          </Button>
        </a>
      </div>
    </div>
  );
}
