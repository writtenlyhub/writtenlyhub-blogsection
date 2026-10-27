export function buildCanonicalUrl(
  overrideUrl?: string | null,
  slug?: string | null,
  pathPrefix: string = '/blog/',
): string {
  const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://writtenlyhub.com').replace(/\/$/, '');

  // A CMS override is optional, but when supplied it must be an absolute
  // HTTP(S) URL. Invalid/relative values fall back to the generated route URL.
  const candidate = overrideUrl?.trim();
  if (candidate) {
    try {
      const parsed = new URL(candidate);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        return candidate;
      }
    } catch {
      // Fall through to the generated canonical URL.
    }
  }

  if (!slug) {
    return SITE_URL;
  }

  const cleanPrefix = pathPrefix.startsWith('/') ? pathPrefix : `/${pathPrefix}`;
  const normalizedPrefix = cleanPrefix.endsWith('/') ? cleanPrefix : `${cleanPrefix}/`;
  return `${SITE_URL}${normalizedPrefix}${slug}`;
}
