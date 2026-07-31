# Next.js & Payload Cache Architecture

This document maps out the unified, event-driven caching strategy implemented in this application. Time-based ISR (e.g., `revalidate: 3600`) has been completely removed in favor of precise, on-demand invalidation powered by Payload CMS collection hooks.

## Core Principle: Event-Driven Caching
Every time a Payload collection is updated or deleted, it triggers `afterChange` or `afterDelete` hooks. These hooks call `revalidateCollection(tags)`, which executes Next.js's native `revalidateTag(tag)`. This ensures that cache invalidation is instant and perfectly synchronized with database updates.

---

## Cache Dependency Map

| Cache Tag | Invalidated By (Collection Hooks) | Consumed By (Frontend Routes) |
| :--- | :--- | :--- |
| `blogs` | `Blogs`, `Tags`, `HomepageSettings` | `/blog` (Archive), `/sitemap.xml`, `/feed.xml` |
| `blog-{slug}` | `Blogs` | `/blog/[slug]` (Article Detail) |
| `categories` | `Categories`, `HomepageSettings` | `/blog` (Archive filters), `/` (Homepage) |
| `homepage-settings` | `HomepageSettings` | `/` (Homepage) |
| `site-settings` | `SiteSettings` | Global layout (Header, Footer, Metadata) |

---

## How to Add a New Cached Resource correctly

If you are adding a new data model (e.g., `Testimonials`), follow this exact process to ensure the cache invalidates correctly:

1. **Tag the Fetch Request**
In `src/lib/api/cache.ts`, wrap your fetch call in `unstable_cache` and assign a unique tag. Do **not** use the `revalidate: number` option.
```typescript
export const getCachedTestimonials = async () => {
  const cached = unstable_cache(
    async () => getTestimonials(),
    ['testimonials-list'],
    { tags: ['testimonials'] } // <-- Tag it, no time limit
  );
  return cached();
};
```

2. **Add the Payload Hook**
In `src/collections/Testimonials.ts`, ensure that saving a document notifies the Next.js cache.
```typescript
import { revalidateCollection } from '../lib/utils/revalidate'

export const Testimonials: CollectionConfig = {
  // ...
  hooks: {
    afterChange: [() => revalidateCollection(['testimonials'])],
    afterDelete: [() => revalidateCollection(['testimonials'])],
  },
}
```

## Securing Revalidation
The `/api/revalidate` webhook acts as a fallback for external scripts. It is secured by a Bearer token or `?secret=` query parameter that must match `process.env.PAYLOAD_SECRET`.
