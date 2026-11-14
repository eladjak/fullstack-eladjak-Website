/**
 * Where the confirmation link points. Never derived from the request's Host
 * or Origin headers (an attacker could poison them and mail a victim a link
 * to a look-alike site). Only from: the production domain allowlist, or this
 * deployment's own host as set by Vercel when it is a preview build.
 */
const PRODUCTION_ORIGINS = [
  "https://fullstack-eladjak.co.il",
  "https://www.fullstack-eladjak.co.il",
];
const DEFAULT_ORIGIN = "https://fullstack-eladjak.co.il";
const PREVIEW_HOST = /^eladjak-website[a-z0-9-]*\.vercel\.app$/;

export function confirmOrigin(env: {
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}): string {
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL && PREVIEW_HOST.test(env.VERCEL_URL)) {
    return `https://${env.VERCEL_URL}`;
  }
  const configured = env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (configured && PRODUCTION_ORIGINS.includes(configured)) return configured;
  return DEFAULT_ORIGIN;
}
