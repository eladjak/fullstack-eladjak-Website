/**
 * The canonical list of guide slugs, as plain strings.
 *
 * This exists separately from `allGuides` so that the CSP proxy (which runs on
 * every request, at the edge) can validate a guide slug WITHOUT importing the
 * guide content — that is ~11,000 lines of Hebrew and English prose that must
 * never be pulled into the edge bundle.
 *
 * `claude-code` is deliberately absent: the guide data still exists, but the
 * route is retired, so /guide/claude-code must 404 like any other unknown slug.
 *
 * Kept honest by src/data/agent-guides/__tests__/slugs.test.ts, which fails if
 * this list ever drifts from allGuides / allGuidesEn.
 */
export const GUIDE_SLUGS: readonly string[] = [
  "adopter",
  "aider",
  "aurora",
  "autonomy",
  "box",
  "capability-ladder",
  "ceo-loop",
  "cloudflare-tunnel",
  "crewai",
  "dashboard",
  "delegator",
  "docker",
  "github-actions",
  "hermes",
  "kami",
  "kaylee",
  "n8n",
  "nginx",
  "ollama",
  "orchestration",
  "output-guardian",
  "postgres",
  "qdrant",
  "ranch",
  "redis-streams",
  "sailaco",
  "solis",
  "systemd",
  "ufw",
  "understand-anything",
  "vercel",
] as const;

export const GUIDE_SLUG_SET: ReadonlySet<string> = new Set(GUIDE_SLUGS);
