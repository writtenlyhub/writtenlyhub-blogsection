import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * GET /api/preview
 *
 * Disables Next.js Draft Mode (exits the preview session).
 *
 * Usage:
 *   /api/preview
 *
 * Typically linked from a preview banner so editors can return to the
 * published view after reviewing a draft.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get('redirect') || '/blog';

  const draft = await draftMode();
  draft.disable();

  // Validate the redirect path to ensure it's a relative URL to prevent open redirects
  const safeRedirect = redirectPath.startsWith('/') ? redirectPath : '/blog';

  return NextResponse.redirect(new URL(safeRedirect, request.url));
}
