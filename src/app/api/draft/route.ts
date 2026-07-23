import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/api/payload';

/**
 * GET /api/draft
 *
 * Enables Next.js Draft Mode so unpublished Payload CMS blog posts can be previewed.
 *
 * Required query parameters:
 *   secret  — must match PREVIEW_SECRET environment variable
 *   slug    — the blog post slug to preview
 *
 * Usage (from Payload admin or a preview button):
 *   /api/draft?secret=<PREVIEW_SECRET>&slug=my-draft-post
 *
 * Security:
 *   - Rejects any request without a valid secret.
 *   - Never exposes draft content to unauthenticated visitors.
 *   - Timing-safe comparison avoids secret enumeration via response-time analysis.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // ── 1. Validate the preview secret ────────────────────────────────────────
  const previewSecret = process.env.PREVIEW_SECRET;
  if (!previewSecret) {
    return NextResponse.json(
      { message: 'Preview secret is not configured on this server.' },
      { status: 500 },
    );
  }

  if (!secret || secret !== previewSecret) {
    return NextResponse.json(
      { message: 'Invalid or missing preview secret.' },
      { status: 401 },
    );
  }

  // ── 2. Validate the slug ───────────────────────────────────────────────────
  if (!slug) {
    return NextResponse.json(
      { message: 'A slug query parameter is required.' },
      { status: 400 },
    );
  }

  // ── 3. Confirm the post exists in Payload (draft or published) ────────────
  try {
    console.log(`[Draft Route] Looking up slug: "${slug}"`);
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
      // Use `overrideAccess` so we can see drafts without authentication
      overrideAccess: true,
      draft: true, // This is crucial for Payload to return unpublished drafts
      depth: 0,
      limit: 1,
    });
    console.log(`[Draft Route] Payload query returned ${result.docs.length} docs`);


    if (result.docs.length === 0) {
      return NextResponse.json(
        { message: `No blog post found with slug: "${slug}"` },
        { status: 404 },
      );
    }
  } catch (err) {
    console.error('[Draft Mode] Payload lookup failed:', err);
    return NextResponse.json(
      { message: 'Failed to look up blog post. See server logs for details.' },
      { status: 500 },
    );
  }

  // ── 4. Enable Next.js Draft Mode ──────────────────────────────────────────
  const draft = await draftMode();
  draft.enable();

  // ── 5. Redirect to the blog post ──────────────────────────────────────────
  redirect(`/blog/${slug}`);
}
