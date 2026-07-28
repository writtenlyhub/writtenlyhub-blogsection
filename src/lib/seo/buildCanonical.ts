export function buildCanonicalUrl(overrideUrl?: string | null, slug?: string | null, pathPrefix: string = '/blog/'): string {
  if (overrideUrl) {
    return overrideUrl;
  }
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com';
  if (!slug) {
    return SITE_URL;
  }
  // Ensure we don't end up with double slashes
  const cleanPrefix = pathPrefix.startsWith('/') ? pathPrefix : `/${pathPrefix}`;
  const cleanUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${cleanUrl}${cleanPrefix}${slug}`;
}
