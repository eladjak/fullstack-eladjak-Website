import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const worktree = 'C:/Users/eladj/projects/portfolio-wt-renewal-guides-20260915';
const evidenceDir = path.join(worktree, '.g01-evidence', 'latest-source-reverify-v1');
const base = 'http://127.0.0.1:4381';
function localRedirect(location, requestUrl) {
  if (!location) throw new Error('missing redirect location');
  const resolved = new URL(location, requestUrl);
  if (resolved.origin !== base || resolved.username || resolved.password) {
    throw new Error('non-local redirect refused');
  }
  return resolved;
}
assert.equal(localRedirect('/guide/', base).href, base + '/guide/');
assert.throws(() => localRedirect('https://example.invalid/', base));
const buildId = (await readFile(path.join(worktree, '.next/BUILD_ID'), 'utf8')).trim();
assert.equal(buildId, 'LwI7Bi1TiWMTa25h2dNTr');
const cases = [
  { name: 'root', path: '/', markers: ['אלעד יעקובוביץ'] },
  { name: 'blog', path: '/blog', markers: ['בלוג'] },
  { name: 'projects', path: '/projects', markers: ['פרויקטים'] },
  { name: 'he-guide-base', path: '/guide', markers: ['מצאו מדריך', 'מדריכים נמצאו'] },
  { name: 'en-guide-base', path: '/en/guide', markers: ['Find a guide', 'guides found'] },
  { name: 'sitemap', path: '/sitemap.xml', markers: ['https://fullstack-eladjak.co.il/blog'] },
  { name: 'he-guide-no-results', path: '/guide?q=zzzz-g01-benign-no-match-20260915', markers: ['לא נמצאו מדריכים מתאימים', 'הצג את כל המדריכים'] },
  { name: 'he-guide-reset', path: '/guide', markers: ['מצאו מדריך', 'מדריכים נמצאו'] },
  { name: 'en-guide-no-results', path: '/en/guide?q=zzzz-g01-benign-no-match-20260915', markers: ['No matching guides found', 'Browse all guides'] },
  { name: 'en-guide-reset', path: '/en/guide', markers: ['Find a guide', 'guides found'] },
];
const results = [];
for (const test of cases) {
  const initial = await fetch(`${base}${test.path}`, { redirect: 'manual' });
  const response = initial.status >= 300 && initial.status < 400
    ? await fetch(localRedirect(initial.headers.get('location'), `${base}${test.path}`), { redirect: 'error' })
    : initial;
  const body = await response.text();
  const missingMarkers = test.markers.filter((marker) => !body.includes(marker));
  results.push({ name: test.name, path: test.path, initialStatus: initial.status, redirectLocation: initial.headers.get('location'), finalStatus: response.status, positiveMarkers: test.markers, missingMarkers, bodyBytes: Buffer.byteLength(body), pass: response.status === 200 && missingMarkers.length === 0 });
}
const receipt = { schema: 1, checkedAt: new Date().toISOString(), base, buildIdOnDisk: buildId, results, passed: results.every((result) => result.pass) };
await writeFile(path.join(evidenceDir, 'smoke-results.json'), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
process.exitCode = receipt.passed ? 0 : 1;
