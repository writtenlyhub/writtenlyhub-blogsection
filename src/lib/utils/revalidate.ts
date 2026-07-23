export function revalidateCollection(tags: string[]) {
  // Fire and forget fetch request to our Next.js Route Handler.
  // We use full absolute URL since this may be running in the server context.
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : null;
      
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || vercelUrl || 'http://localhost:3000';
  
  fetch(`${baseUrl}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags }),
  }).catch((err) => {
    console.error(`[Cache Revalidation] Failed to trigger revalidation for tags: ${tags.join(', ')}`, err);
  });
}
