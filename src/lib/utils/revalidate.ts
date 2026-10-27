import { revalidateTag } from 'next/cache';

export interface WebhookRevalidationResult {
  ok: boolean;
  status?: number;
  error?: string;
  revalidated?: boolean;
}

/**
 * Sends an authenticated POST request to /api/revalidate.
 * Securely uses the PAYLOAD_SECRET environment variable via Authorization header.
 * Never logs secrets or exposes them in query strings.
 */
export async function sendRevalidationWebhook(
  tags: string[],
  baseUrl?: string,
  secret?: string,
): Promise<WebhookRevalidationResult> {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return { ok: false, error: 'No tags provided' };
  }

  const token = secret !== undefined ? secret : process.env.PAYLOAD_SECRET;
  if (!token) {
    console.warn('[Cache Revalidation] Missing PAYLOAD_SECRET configuration; skipping webhook fallback.');
    return { ok: false, error: 'Missing PAYLOAD_SECRET' };
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : null;

  const resolvedBaseUrl = baseUrl || process.env.NEXT_PUBLIC_SERVER_URL || vercelUrl || 'http://localhost:3000';
  const url = `${resolvedBaseUrl.replace(/\/$/, '')}/api/revalidate`;

  console.log(`[Cache Revalidation] Dispatching authenticated webhook for tags: ${tags.join(', ')}`);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ tags }),
    });

    const status = res.status;
    let data: { error?: string; revalidated?: boolean } | null = null;
    try {
      data = (await res.json()) as { error?: string; revalidated?: boolean };
    } catch {
      // response wasn't JSON
    }

    if (!res.ok) {
      const errorMsg = data?.error || `HTTP ${status}`;
      console.warn(`[Cache Revalidation] Webhook rejected request (HTTP ${status}): ${errorMsg}`);
      return { ok: false, status, error: errorMsg };
    }

    console.log(`[Cache Revalidation] Webhook completed successfully (HTTP ${status})`);
    return { ok: true, status, revalidated: Boolean(data?.revalidated) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cache Revalidation] Webhook network error:', message);
    return { ok: false, error: message };
  }
}

export async function revalidateCollection(tags: string[]) {
  if (!tags || tags.length === 0) return;

  console.log(`[Cache Revalidation] Triggering direct revalidateTag for: ${tags.join(', ')}`);
  
  try {
    for (const tag of tags) {
      // @ts-expect-error Next.js 15+ types require a second argument but it's optional at runtime
      revalidateTag(tag);
      console.log(`[Cache Revalidation] Successfully executed revalidateTag('${tag}')`);
    }
  } catch {
    console.error(`[Cache Revalidation] Direct revalidateTag failed; attempting webhook fallback for: ${tags.join(', ')}`);
    await sendRevalidationWebhook(tags);
  }
}
