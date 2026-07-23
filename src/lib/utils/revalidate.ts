import { revalidateTag } from 'next/cache';

export async function revalidateCollection(tags: string[]) {
  console.log(`[Cache Revalidation] Triggering direct revalidateTag for: ${tags.join(', ')}`);
  
  try {
    for (const tag of tags) {
      // @ts-expect-error Next.js 15+ types require a second argument but it's optional at runtime
      revalidateTag(tag);
      console.log(`[Cache Revalidation] Successfully executed revalidateTag('${tag}')`);
    }
  } catch (err) {
    console.error(`[Cache Revalidation] Failed to execute revalidateTag for tags: ${tags.join(', ')}`, err);
    // If it fails (e.g., if called from outside a Next.js request context during a script), 
    // we fallback to the webhook.
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : null;
        
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || vercelUrl || 'http://localhost:3000';
    const url = `${baseUrl}/api/revalidate`;
    console.log(`[Cache Revalidation] Falling back to webhook POST ${url}`);
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags }),
      });
      const text = await res.text();
      console.log(`[Cache Revalidation] Webhook response: Status ${res.status}, Body: ${text}`);
    } catch (fallbackErr) {
      console.error(`[Cache Revalidation] Webhook fallback failed:`, fallbackErr);
    }
  }
}
