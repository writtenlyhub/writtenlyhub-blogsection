'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export const DataGraphBlockWrapper = dynamic(
  () => import('@/components/blog/DataGraphBlock').then((mod) => mod.DataGraphBlock),
  { ssr: false, loading: () => <div className="my-10 w-full h-[400px] animate-pulse bg-surface-container-low rounded-xl" /> }
);
