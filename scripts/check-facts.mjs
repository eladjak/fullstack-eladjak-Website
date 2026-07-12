#!/usr/bin/env node
/**
 * check-facts.mjs — count-drift guard (portfolio-audit-spec §7, idea 3)
 *
 * The site had FIVE different agent counts on it (3/9/10/12/13) before the
 * 2026-07-10 staleness audit. site-facts.ts is now the single source of truth
 * (AGENT_COUNT = 12). This gate FAILS the build if a *bare integer* appears
 * immediately before an "agent"/"agents"/"סוכנ…" word AND that integer is NOT
 * one of the values the site is allowed to say near "agent":
 *
 *   ALLOWED_COUNTS =
 *     12  → the canonical agent-network count (AGENT_COUNT)
 *     32  → the number of /guide entries ("32 agent + infra guides")
 *     2-5 → small pedagogical examples in the guide prose
 *           ("start with 2 agents", "a crew of 3 agents", "fronts 5 agents")
 *
 * Anything else near "agent" — most importantly the historical drift values
 * 9 / 10 / 13 — fails the build. This closes the "multiple agent counts on one
 * site" problem: a new stale count can't slip in, while the legitimate
 * canonical/guides/example numbers still pass.
 *
 * It intentionally does NOT flag `${AGENT_COUNT} סוכני` (derived) or vague
 * phrasings like "רשת הסוכנים" (no number).
 *
 * Usage:  node scripts/check-facts.mjs
 * Exit 0 = clean, Exit 1 = drift found (prints file:line for each hit).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Directories to scan.
const SCAN_DIRS = ['src', 'messages'];

// Files/paths that are ALLOWED to hold a literal count (the source of truth,
// plus this checker's own doc and the auto-generated skills dump).
const ALLOW = [
  path.join('src', 'data', 'site-facts.ts'),
  path.join('src', 'data', 'skills-universe-generated.ts'),
];

// Extensions worth scanning.
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.mdx', '.md']);

// Integers that are legitimate to appear near "agent":
//   12 = canonical agent-network count · 32 = number of /guide entries
//   2-5 = small pedagogical examples in the guide prose
const ALLOWED_COUNTS = new Set([2, 3, 4, 5, 12, 32]);

// A bare integer directly before an agent word.
//  - Hebrew: "12 סוכנים" / "12 הסוכנים" / "9 סוכני"
//  - English: "12 agents" / "10 agent"
// The digit must NOT be preceded by `$`/`{`/a word char (so `${AGENT_COUNT}` and
// version-y tokens like `v12agents` don't trip it — though those are unlikely).
const DRIFT_RE =
  /(?<![\w${])\b(\d{1,3})\s*(?:ה)?(?:agents?\b|סוכנ)/gi;

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.isSymbolicLink()) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next') continue;
      out.push(...(await walk(full)));
    } else if (e.isFile() && EXTS.has(path.extname(e.name))) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = (await Promise.all(SCAN_DIRS.map((d) => walk(path.join(ROOT, d))))).flat();
  const hits = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (ALLOW.some((a) => rel === a)) continue;
    const text = await fs.readFile(file, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      DRIFT_RE.lastIndex = 0;
      let m;
      while ((m = DRIFT_RE.exec(line)) !== null) {
        const n = Number.parseInt(m[1], 10);
        if (ALLOWED_COUNTS.has(n)) continue;
        hits.push({ rel, line: i + 1, match: m[0].trim(), col: m.index + 1 });
      }
    });
  }

  if (hits.length > 0) {
    console.error('\n❌ check:facts — count-drift found (non-canonical integer before "agent"/"סוכנ"):\n');
    for (const h of hits) {
      console.error(`  ${h.rel}:${h.line}:${h.col}  →  "${h.match}"`);
    }
    console.error(
      '\nThe agent-network count is 12 (AGENT_COUNT in src/data/site-facts.ts); /guide has 32 entries.' +
        '\nUse AGENT_COUNT, "32", a small example (2-5), or a number-free phrasing like "רשת הסוכנים".' +
        '\nIf another value is genuinely correct, add it to ALLOWED_COUNTS in scripts/check-facts.mjs.\n',
    );
    process.exit(1);
  }

  console.log(`✅ check:facts — no count-drift in ${files.length} scanned files.`);
}

main().catch((e) => {
  console.error('check:facts FATAL:', e);
  process.exit(1);
});
