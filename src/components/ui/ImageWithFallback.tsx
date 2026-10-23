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
  fallbackSrc,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  let finalSrc = fallbackSrc || '';
  let finalAlt = alt;

  if (src) {
    if (typeof src === 'string') {
      finalSrc = src.trim();
    } else if (typeof src === 'object' && src !== null && src.url) {
      finalSrc = src.url.trim();
      finalAlt = alt || src.alt || '';
    }

    try {
      if (finalSrc.startsWith('http')) {
        const parsed = new URL(finalSrc);
        if (
          parsed.hostname === 'localhost' ||
          parsed.hostname === '127.0.0.1' ||
          parsed.hostname === 'writtenlyhub.com' ||
          parsed.hostname === 'www.writtenlyhub.com' ||
          parsed.hostname.endsWith('.vercel.app')
        ) {
          finalSrc = parsed.pathname;
        }
      } else if (!finalSrc.startsWith('/')) {
        finalSrc = `/${finalSrc}`;
      }
    } catch {}

    try {
      finalSrc = encodeURI(decodeURI(finalSrc));
    } catch {}
  }

  if (error || !finalSrc) {
    if (fallbackSrc) {
      return (
        <Image
          src={fallbackSrc}
          alt={finalAlt || 'Image'}
          className={className}
          onError={() => {
            if (!error) setError(true);
          }}
          {...props}
        />
      );
    }

    return (
      <div className={`w-full h-full bg-[#F8F9FB] flex items-center justify-center ${className || ''}`}>
        <span className="text-on-surface-variant/40 font-label-md text-xs">No Image Available</span>
      </div>
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={finalAlt}
      className={className}
      onError={() => {
        if (!error) setError(true);
      }}
      {...props}
    />
  );
}
