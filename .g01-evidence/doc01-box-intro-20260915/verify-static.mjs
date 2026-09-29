import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const repo = process.cwd();
const outDir = path.join(repo, '.g01-evidence', 'doc01-box-intro-20260915');
const files = [
  { locale: 'he', relativePath: 'src/data/agent-guides/box.ts', linkPrefixes: ['/guide/', '/claude-code'], selfPath: '/guide/box' },
  { locale: 'en', relativePath: 'src/data/agent-guides/en/box.ts', linkPrefixes: ['/en/guide/', '/en/claude-code'], selfPath: '/en/guide/box' },
];
const normalize = (value) => value.replace(/\r\n/g, '\n');
const hash = (value) => createHash('sha256').update(value).digest('hex').toUpperCase();
function extractHero(sourceText, fileName) {
  const ast = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const parseDiagnostics = ast.parseDiagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  const hits = [];
  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === 'heroDescription') {
      const initializer = node.initializer;
      if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
        hits.push({ start: initializer.getStart(ast), end: initializer.end, text: initializer.text, kind: ts.SyntaxKind[initializer.kind] });
      } else {
        hits.push({ start: initializer.getStart(ast), end: initializer.end, text: null, kind: ts.SyntaxKind[initializer.kind] });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return { parseDiagnostics, hits };
}
function sentenceCount(text) {
  return text.split(/[.!?](?:\s|$)/u).filter((part) => part.trim().length > 0).length;
}
function validateLinks(text, linkPrefixes, selfPath) {
  const links = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)].map((match) => match[1]);
  return { links, exactTwo: links.length === 2, localized: links.every((href) => linkPrefixes.some((prefix) => href === prefix || href.startsWith(prefix))), noSelfLink: links.every((href) => href !== selfPath) };
}
const changedNames = execFileSync('git', ['diff', '--name-only', 'HEAD', '--', ...files.map((item) => item.relativePath)], { cwd: repo, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
const results = [];
for (const item of files) {
  const currentRaw = await readFile(path.join(repo, item.relativePath), 'utf8');
  const headRaw = execFileSync('git', ['show', `HEAD:${item.relativePath}`], { cwd: repo, encoding: 'utf8' });
  const current = normalize(currentRaw);
  const head = normalize(headRaw);
  const now = extractHero(current, item.relativePath);
  const before = extractHero(head, item.relativePath);
  const heroCardinality = now.hits.length === 1 && before.hits.length === 1 && now.hits[0].text !== null && before.hits[0].text !== null;
  const heroChanged = heroCardinality && now.hits[0].text !== before.hits[0].text;
  const currentWithoutHero = heroCardinality ? current.slice(0, now.hits[0].start) + '__HERO_DESCRIPTION__' + current.slice(now.hits[0].end) : null;
  const headWithoutHero = heroCardinality ? head.slice(0, before.hits[0].start) + '__HERO_DESCRIPTION__' + head.slice(before.hits[0].end) : null;
  const nonHeroUnchanged = currentWithoutHero === headWithoutHero;
  const sentences = heroCardinality ? sentenceCount(now.hits[0].text) : 0;
  const links = heroCardinality ? validateLinks(now.hits[0].text, item.linkPrefixes, item.selfPath) : { links: [], exactTwo: false, localized: false, noSelfLink: false };
  const hasHebrew = heroCardinality && /[\u0590-\u05FF]/u.test(now.hits[0].text);
  results.push({ locale: item.locale, relativePath: item.relativePath, currentSha256: hash(currentRaw), headSha256: hash(headRaw), parseDiagnostics: now.parseDiagnostics, heroPropertyCountCurrent: now.hits.length, heroPropertyCountHead: before.hits.length, heroChanged, nonHeroUnchanged, sentenceCount: sentences, sentenceCountValid: sentences >= 5 && sentences <= 6, linkCount: links.links.length, linksLocalized: links.localized, noSelfLink: links.noSelfLink, englishHasNoHebrew: item.locale !== 'en' || !hasHebrew });
}
const pass = changedNames.length === 2 && files.every((item) => changedNames.includes(item.relativePath)) && results.every((result) => result.parseDiagnostics.length === 0 && result.heroPropertyCountCurrent === 1 && result.heroPropertyCountHead === 1 && result.heroChanged && result.nonHeroUnchanged && result.sentenceCountValid && result.linkCount === 2 && result.linksLocalized && result.noSelfLink && result.englishHasNoHebrew);
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'doc01-results.json'), `${JSON.stringify({ schema: 1, checkedAt: new Date().toISOString(), parser: ts.version, changedNames, results, pass }, null, 2)}\n`);
process.exitCode = pass ? 0 : 1;
