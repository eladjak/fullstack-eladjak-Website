import { NextResponse, type NextRequest } from 'next/server';

/**
 * Nonce-based Content Security Policy proxy (Next.js 16+ replaced the
 * "middleware" file convention with "proxy" — same runtime, new name).
 *
 * Why this exists:
 *  - Removes the last 'unsafe-inline' XSS-hardening hole flagged by security review.
 *  - Generates a fresh per-request nonce and injects it into the CSP header.
 *  - Next.js auto-detects the nonce from the `content-security-policy` request
 *    header (see node_modules/next/dist/server/app-render/get-script-nonce-from-header.js)
 *    and applies it to all framework-emitted bootstrap/hydration scripts.
 *  - User-authored inline scripts (next/script with dangerouslySetInnerHTML) read
 *    the nonce via `(await headers()).get('x-nonce')` and pass it as the `nonce`
 *    prop to <Script>.
 *  - 'strict-dynamic' lets the nonce'd Next.js bootstrap load downstream chunks
 *    without re-listing them; this is the modern OWASP-recommended pattern.
 *
 * Routes excluded (matcher): API routes, static assets, images, videos, prefetches.
 * For excluded routes, no CSP is set; the browser does not execute scripts
 * from those responses anyway (JSON / static files / image bytes).
 */
export function proxy(request: NextRequest) {
  // 16-byte base64 nonce (24 chars). crypto.randomUUID() also works, but base64
  // of random bytes is the more conventional CSP nonce shape.
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const isDev = process.env.NODE_ENV !== 'production';

  // In dev, Next.js + Turbopack use eval() for HMR — we need 'unsafe-eval'.
  // In prod, no eval is used in compiled bundles.
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const cspHeader = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Tailwind/framer-motion inject runtime CSS-in-JS via inline <style>.
    // Removing 'unsafe-inline' from style-src would require a separate nonce
    // pass for styles — out of scope for this XSS-hardening migration.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.openai.com https://api.github.com https://api.resend.com https://hub.eladjak.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  // Forward both headers to the request so server components can read the
  // nonce via `(await headers()).get('x-nonce')` and Next.js can extract
  // the nonce from the CSP directive for its own bootstrap scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Also send CSP on the response so browsers actually enforce it.
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  // Skip middleware for assets and API routes. Prefetches are also skipped to
  // avoid burning a unique nonce on every Link prefetch (the prefetched HTML
  // would otherwise contain a stale nonce by the time the user navigates).
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|videos|manifest.json|feed.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
