'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils/blogMapper';

type PayloadMedia = {
  id?: string | number;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export interface ArticleImageProps {
  src: string | PayloadMedia | null | undefined;
  alt?: string;
  width?: number | null;
  height?: number | null;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ArticleImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  imageClassName = '',
  priority = false,
  sizes,
  fallbackSrc,
  style,
  onLoad,
}: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  let finalSrc = fallbackSrc || '';
  let finalAlt = alt;
  let finalWidth = width ?? undefined;
  let finalHeight = height ?? undefined;

  if (src) {
    if (typeof src === 'string') {
      finalSrc = src.trim();
    } else if (typeof src === 'object' && src !== null && src.url) {
      finalSrc = src.url.trim();
      finalAlt = alt || src.alt || '';
      if (!finalWidth && typeof src.width === 'number') finalWidth = src.width;
      if (!finalHeight && typeof src.height === 'number') finalHeight = src.height;
    }
  }

  if (finalSrc) {
    finalSrc = getMediaUrl(finalSrc);
  }

  if (hasError || !finalSrc) {
    if (fallbackSrc) {
      return (
        <Image
          src={fallbackSrc}
          alt={finalAlt || 'Article image'}
          width={finalWidth || 1200}
          height={finalHeight || 675}
          priority={priority}
          className={`article-image ${imageClassName} ${className}`.trim()}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'unset', ...style }}
        />
      );
    }
    return null;
  }

  // Preserve intrinsic aspect ratio from CMS metadata
  const renderWidth = finalWidth || 1600;
  const renderHeight = finalHeight || (finalWidth ? Math.round(finalWidth * 0.5625) : 900);

  return (
    <Image
      src={finalSrc}
      alt={finalAlt || 'Article image'}
      width={renderWidth}
      height={renderHeight}
      priority={priority}
      sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px'}
      className={`article-image ${imageClassName} ${className}`.trim()}
      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'unset', ...style }}
      onLoad={onLoad}
      onError={() => setHasError(true)}
    />
  );
}

// Aliases for compatibility
export const ArticleImageFrame = ArticleImage;
export const CmsImage = ArticleImage;
export default ArticleImage;
