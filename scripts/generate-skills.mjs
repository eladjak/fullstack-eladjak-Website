#!/usr/bin/env node
/**
 * generate-skills.mjs
 *
 * Scans Elad's actual skills + commands library at:
 *   - C:/Users/eladj/.claude/skills/
 *   - C:/Users/eladj/.claude/commands/
 *
 * For each entry, extracts name + description from frontmatter (or fallback),
 * categorizes via path/name/frontmatter heuristics, dedupes against the
 * hand-curated SKILLS list, and writes to:
 *   src/data/skills-universe-generated.ts
 *
 * Usage: node scripts/generate-skills.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const HOME = os.homedir();
const SKILLS_DIR = path.join(HOME, '.claude', 'skills');
const COMMANDS_DIR = path.join(HOME, '.claude', 'commands');

const OUTPUT_FILE = path.join(
  PROJECT_ROOT,
  'src',
  'data',
  'skills-universe-generated.ts',
);
const CURATED_FILE = path.join(
  PROJECT_ROOT,
  'src',
  'data',
  'skills-universe.ts',
);

// ---------------------------------------------------------------------------
// Utility: read first SKILL.md / skill.md / *.md in a directory
// ---------------------------------------------------------------------------

async function readSkillFile(dirPath) {
  const candidates = ['SKILL.md', 'skill.md', 'Skill.md'];
  for (const candidate of candidates) {
    const full = path.join(dirPath, candidate);
    try {
      const content = await fs.readFile(full, 'utf8');
      return { content, file: full };
    } catch {
      // try next
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Frontmatter parser (no deps)
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  if (!content.startsWith('---')) return { meta: {}, body: content };
  const end = content.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: content };
  const fmRaw = content.slice(3, end).trim();
  const body = content.slice(end + 4).replace(/^\s*\n/, '');
  const meta = {};
  const lines = fmRaw.split(/\r?\n/);
  let currentKey = null;
  let buffer = [];
  const flush = () => {
    if (currentKey) {
      meta[currentKey] = buffer.join(' ').trim();
      buffer = [];
    }
  };
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (m) {
      flush();
      currentKey = m[1];
      buffer = [m[2] ?? ''];
    } else if (currentKey && /^\s+/.test(line)) {
      buffer.push(line.trim());
    }
  }
  flush();
  return { meta, body };
}

// ---------------------------------------------------------------------------
// Categorization heuristics (in order; first match wins)
// ---------------------------------------------------------------------------

function categorize({ id, label, description, fullPath }) {
  const haystack = `${fullPath} ${id} ${label} ${description}`.toLowerCase();
  const idLower = id.toLowerCase();

  // 1) Israeli / Hebrew → tools (per spec, these are domain tools)
  if (/(^|\W)(israeli-|hebrew-|il-)/.test(idLower)) return 'tools';

  // 2) Agent-specific names → ai
  if (/(^|\W)(agent-|kami|kaylee|box|hermes|delegator|autonom|crew|adopter)/.test(idLower))
    return 'ai';

  // 3) Explicit AI/LLM mentions
  if (
    /\b(claude-api|anthropic|gpt|openai|gemini|llm|model context protocol|\bmcp\b|claude code|claude-code|copilot)\b/.test(
      haystack,
    )
  )
    return 'ai';

  // 4) Frontend (specific frameworks/libs)
  if (
    /(^|\W)(react|next|tailwind|ui-|design|css|framer|motion|radix|shadcn|vite|three|drei|gsap|stitch|figma|frontend|component)/.test(
      idLower,
    )
  )
    return 'frontend';

  // 5) Backend (DBs, APIs, server frameworks)
  if (
    /(^|\W)(convex-|supabase-|postgres|mongo|redis|express|fastapi|trpc|prisma|drizzle|hono|sql|api-|backend|auth|clerk|better-auth|email|resend|payment|cardcom|tranzila|stripe|invoice)/.test(
      idLower,
    )
  )
    return 'backend';

  // 6) DevOps (infra, hosting, build tools, CI)
  if (
    /(^|\W)(docker|vercel|railway|github-|deploy|cloudflare|nginx|systemd|ufw|caddy|tunnel|tmux|rsync|fly|turborepo|\bbun\b|pnpm|aws|jfrog|cicd|ci-|backup|gh-)/.test(
      idLower,
    )
  )
    return 'devops';

  // 7) Languages
  if (/(^|\W)(go-|golang|python-|ts-|typescript|js-|javascript|rust-|node-)/.test(idLower))
    return 'lang';

  // 8) Description-level fallbacks (catch broader patterns)
  if (/\b(react|next\.js|nextjs|tailwind|framer-motion|three\.js|r3f|shadcn)\b/.test(haystack))
    return 'frontend';
  if (/\b(postgres|mongo|redis|supabase|convex|prisma|drizzle|database|orm|api endpoint|webhook)\b/.test(haystack))
    return 'backend';
  if (/\b(docker|deploy|kubernetes|github action|ci\/cd|hosting|nginx|systemd|cloudflare)\b/.test(haystack))
    return 'devops';
  if (/\b(typescript|javascript|python|golang|rust|node\.js)\b/.test(haystack))
    return 'lang';

  // Fallback
  return 'tools';
}

// ---------------------------------------------------------------------------
// Recursive scan for *.md files
// ---------------------------------------------------------------------------

async function findMdFiles(dir, rootDir = dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    // Skip symlinks to prevent escape outside the rootDir.
    if (entry.isSymbolicLink()) continue;
    const full = path.join(dir, entry.name);
    // Defense-in-depth: ensure resolved path stays within root.
    const rel = path.relative(rootDir, full);
    if (rel.startsWith('..') || path.isAbsolute(rel)) continue;
    if (entry.isDirectory()) {
      const sub = await findMdFiles(full, rootDir);
      out.push(...sub);
    } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Extract first non-blank prose line (for fallback description)
// ---------------------------------------------------------------------------

function firstProseLine(body) {
  const lines = body.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('#')) continue;
    if (line.startsWith('```')) continue;
    if (line.startsWith('|')) continue;
    if (line.startsWith('-') || line.startsWith('*')) {
      const stripped = line.replace(/^[-*]\s+/, '').trim();
      if (stripped) return stripped;
      continue;
    }
    return line;
  }
  return '';
}

// ---------------------------------------------------------------------------
// Truncation with safe Unicode handling
// ---------------------------------------------------------------------------

function truncate(s, max = 200) {
  if (!s) return '';
  // strip markdown emphasis chars and inline code backticks
  let cleaned = s
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  // strip surrounding quotes (frontmatter values often quoted)
  cleaned = cleaned.replace(/^["'](.*)["']$/, '$1').trim();
  // collapse repeated quotes at start/end
  cleaned = cleaned.replace(/^["']+/, '').replace(/["']+$/, '').trim();
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max - 1).trimEnd() + '…';
}

function escapeForTemplate(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function safeId(raw) {
  return raw
    .toLowerCase()
    .replace(/\.md$/i, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Read curated labels for de-dup
// ---------------------------------------------------------------------------

async function readCuratedLabels() {
  const text = await fs.readFile(CURATED_FILE, 'utf8');
  const labels = new Set();
  const ids = new Set();
  const labelRegex = /label:\s*["']([^"']+)["']/g;
  const idRegex = /id:\s*["']([^"']+)["']/g;
  let m;
  while ((m = labelRegex.exec(text)) !== null) {
    labels.add(m[1].toLowerCase().trim());
  }
  while ((m = idRegex.exec(text)) !== null) {
    ids.add(m[1].toLowerCase().trim());
  }
  return { labels, ids };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function processSkillsDir() {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  } catch (e) {
    console.error(`[skills] ERROR reading ${SKILLS_DIR}:`, e.message);
    return out;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(SKILLS_DIR, entry.name);
    const skillFile = await readSkillFile(dirPath);
    if (!skillFile) continue;
    const { meta, body } = parseFrontmatter(skillFile.content);
    const name = (meta.name || entry.name).trim();
    const description =
      (meta.description && meta.description.trim()) ||
      firstProseLine(body) ||
      `Skill: ${entry.name}`;
    out.push({
      sourceKind: 'skill',
      id: safeId(entry.name),
      label: name,
      description: truncate(description, 200),
      fullPath: dirPath,
    });
  }
  return out;
}

async function processCommandsDir() {
  const out = [];
  const files = await findMdFiles(COMMANDS_DIR);
  if (files.length === 0) {
    console.error(`[commands] WARNING no md files in ${COMMANDS_DIR}`);
  }
  for (const file of files) {
    let content;
    try {
      content = await fs.readFile(file, 'utf8');
    } catch {
      continue;
    }
    const { meta, body } = parseFrontmatter(content);
    const base = path.basename(file, '.md');
    const name = (meta.name || base).trim();
    const description =
      (meta.description && meta.description.trim()) ||
      firstProseLine(body) ||
      `Command: ${base}`;
    out.push({
      sourceKind: 'command',
      id: safeId(`cmd-${base}`),
      label: name,
      description: truncate(description, 200),
      fullPath: file,
    });
  }
  return out;
}

async function main() {
  console.log('--- Skills generator ---');
  console.log(`Scanning skills:   ${SKILLS_DIR}`);
  console.log(`Scanning commands: ${COMMANDS_DIR}`);

  const [skillEntries, commandEntries] = await Promise.all([
    processSkillsDir(),
    processCommandsDir(),
  ]);

  console.log(`Found ${skillEntries.length} skills, ${commandEntries.length} commands`);

  if (skillEntries.length === 0 && commandEntries.length === 0) {
    console.error('FATAL: zero entries discovered. Paths tried:');
    console.error(`  skills:   ${SKILLS_DIR}`);
    console.error(`  commands: ${COMMANDS_DIR}`);
    process.exit(1);
  }

  const all = [...skillEntries, ...commandEntries];
  const { labels: curatedLabels, ids: curatedIds } = await readCuratedLabels();

  // Dedup: by case-insensitive label match against curated, and unique within generated
  const seenLabels = new Set();
  const seenIds = new Set();
  const filtered = [];
  let dupCurated = 0;
  let dupSelf = 0;
  for (const e of all) {
    const labelKey = e.label.toLowerCase().trim();
    if (curatedLabels.has(labelKey)) {
      dupCurated++;
      continue;
    }
    if (seenLabels.has(labelKey)) {
      dupSelf++;
      continue;
    }
    let id = `gen:${e.id}`;
    let n = 2;
    while (seenIds.has(id) || curatedIds.has(id)) {
      id = `gen:${e.id}-${n++}`;
    }
    seenLabels.add(labelKey);
    seenIds.add(id);
    filtered.push({
      ...e,
      genId: id,
      category: categorize({
        id: e.id,
        label: e.label,
        description: e.description,
        fullPath: e.fullPath,
      }),
    });
  }

  console.log(
    `After dedup: ${filtered.length} entries (filtered ${dupCurated} curated dups, ${dupSelf} self dups)`,
  );

  // Stable sort: skills first, then commands; inside each by label
  filtered.sort((a, b) => {
    if (a.sourceKind !== b.sourceKind)
      return a.sourceKind === 'skill' ? -1 : 1;
    return a.label.localeCompare(b.label);
  });

  const header = `// AUTO-GENERATED by scripts/generate-skills.mjs — DO NOT EDIT BY HAND.
// Source: ~/.claude/skills/ + ~/.claude/commands/
// Regenerate: node scripts/generate-skills.mjs
import type { SkillNode } from './skills-universe';

export const GENERATED_SKILLS: SkillNode[] = [
`;

  const body = filtered
    .map((e) => {
      const desc = escapeForTemplate(e.description);
      const label = escapeForTemplate(e.label);
      return `  { id: ${JSON.stringify(e.genId)}, label: \`${label}\`, category: ${JSON.stringify(
        e.category,
      )}, description: \`${desc}\` },`;
    })
    .join('\n');

  const footer = `
];

export const GENERATED_COUNT = ${filtered.length};
`;

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, header + body + footer, 'utf8');

  console.log(`\nWrote ${filtered.length} entries → ${OUTPUT_FILE}`);

  // Category breakdown
  const byCat = filtered.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});
  console.log('\nBy category:');
  for (const [cat, count] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat.padEnd(10)} ${count}`);
  }

  // Sample 5 random entries
  console.log('\nSample 5 random entries:');
  const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
  for (const e of shuffled) {
    console.log(`  [${e.category}] ${e.label}`);
    console.log(`     ${e.description.slice(0, 80)}…`);
  }

  console.log('\nDone.');
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
