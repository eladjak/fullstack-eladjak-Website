import type { Locale } from '@/i18n';

const EN_ROUTES_WITH_DEDICATED_EN_PAGE = new Set([
  '/guide',
  '/claude-code',
  '/methodology',
]);

export function getLocaleFromPath(pathname: string): Locale | null {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return null;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname;
}

export function hasEnglishRoute(strippedPath: string): boolean {
  if (strippedPath === '/' || strippedPath === '') return false;
  for (const prefix of EN_ROUTES_WITH_DEDICATED_EN_PAGE) {
    if (strippedPath === prefix || strippedPath.startsWith(`${prefix}/`)) {
      return true;
    }
  }
  return false;
}

export function toggleLocaleInPath(pathname: string, nextLocale: Locale): string {
  const stripped = stripLocalePrefix(pathname);

  if (nextLocale === 'en') {
    if (!hasEnglishRoute(stripped)) return pathname;
    if (stripped === '/') return '/en';
    return `/en${stripped}`;
  }

  return stripped;
}
