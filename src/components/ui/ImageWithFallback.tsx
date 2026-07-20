'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type PayloadMedia = {
  id: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string | PayloadMedia | null | undefined;
  alt?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt = '',
  fallbackSrc = '/images/placeholders/fallback.svg',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  let finalSrc = fallbackSrc;
  let finalAlt = alt;

  if (!error && src) {
    if (typeof src === 'string') {
      finalSrc = src;
    } else if (typeof src === 'object' && src !== null && src.url) {
      finalSrc = src.url;
      finalAlt = alt || src.alt || '';
    }
  }

  return (
    <Image
      src={finalSrc}
      alt={finalAlt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
