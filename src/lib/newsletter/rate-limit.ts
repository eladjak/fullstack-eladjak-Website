/** In-memory fixed-window limiter (per serverless instance, best effort). */
export function createRateLimiter(max: number, windowMs: number, maxKeys = 5_000) {
  const map = new Map<string, { count: number; resetAt: number }>();
  return function allow(key: string): boolean {
    const now = Date.now();
    const entry = map.get(key);
    if (!entry || now > entry.resetAt) {
      if (map.size > maxKeys) {
        for (const [k, e] of map) if (now > e.resetAt) map.delete(k);
        while (map.size >= maxKeys) {
          const oldest = map.keys().next().value;
          if (oldest === undefined) break;
          map.delete(oldest);
        }
      }
      map.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (entry.count >= max) return false;
    entry.count += 1;
    return true;
  };
}

/** Client IP from Vercel-trusted headers; shape-checked and length-capped. */
export function getClientIp(request: Request): string {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const t = candidate.trim();
    if (t.length > 0 && t.length <= 45 && /^[0-9a-fA-F:.%]+$/.test(t)) return t;
  }
  return "unknown";
}
