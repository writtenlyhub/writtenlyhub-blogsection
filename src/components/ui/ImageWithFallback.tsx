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

  // Use a premium AI image as the default fallback
  const aiFallbackImages = [
    '/media/ai_generated_feature_0.png',
    '/media/ai_generated_feature_1.png',
    '/media/ai_generated_feature_2.png'
  ];
  
  // Deterministically select an image based on the alt text or a random one
  const stringToNumber = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };
  
  const defaultFallback = aiFallbackImages[stringToNumber(alt) % aiFallbackImages.length];
  const activeFallback = fallbackSrc || defaultFallback;

  let finalSrc = activeFallback;
  let finalAlt = alt;

  if (src) {
    if (typeof src === 'string') {
      finalSrc = src;
    } else if (typeof src === 'object' && src !== null && src.url) {
      finalSrc = src.url;
      finalAlt = alt || src.alt || '';
    }
    
    // Safely parse URL to avoid Vercel missing domains
    if (finalSrc.includes('/api/media/file/')) {
      finalSrc = finalSrc.replace('/api/media/file/', '/media/');
    }
    try {
      if (finalSrc.startsWith('http')) {
        finalSrc = new URL(finalSrc).pathname;
      }
    } catch {}
  }

  return (
    <Image
      src={error || !finalSrc ? activeFallback : finalSrc}
      alt={error ? 'Image not available' : finalAlt}
      className={className}
      onError={() => {
        // Prevent infinite loops if the fallback itself fails
        if (!error) setError(true);
      }}
      {...props}
    />
  );
}
