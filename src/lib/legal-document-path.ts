export function isLegalDocumentPath(pathname: string | null): boolean {
  return /^\/(privacy|terms)\/?$/.test(pathname ?? '');
}
