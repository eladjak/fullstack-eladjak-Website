import { promises as fs } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(evidence, '..');
const fixture = path.join(evidence, 'prebuild-empty-source-fail-closed-fixture-v3');
const fixtureHome = path.join(fixture, 'empty-user');
const fixtureScript = path.join(fixture, 'scripts', 'generate-skills.mjs');
const fixtureGenerated = path.join(fixture, 'src', 'data', 'skills-universe-generated.ts');
const parkedGenerated = path.join(fixture, 'src', 'data', 'catalog-parked.ts');
const emptyGenerated = path.join(fixture, 'src', 'data', 'catalog-empty.ts');
const directoryGenerated = path.join(fixture, 'src', 'data', 'catalog-directory');
const sourceScript = path.join(root, 'scripts', 'generate-skills.mjs');
const sourceGenerated = path.join(root, 'src', 'data', 'skills-universe-generated.ts');
const sourceCurated = path.join(root, 'src', 'data', 'skills-universe.ts');
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const run = () => spawnSync(process.execPath, [fixtureScript], {
  cwd: fixture,
  encoding: 'utf8',
  env: { ...process.env, USERPROFILE: fixtureHome },
});
const record = (result) => ({ status: result.status, signal: result.signal, stdout: result.stdout, stderr: result.stderr });

if (await fs.stat(fixture).then(() => true).catch(() => false)) {
  throw new Error(`Refusing to reuse existing fixture: ${fixture}`);
}

await fs.mkdir(path.join(fixture, 'scripts'), { recursive: true });
await fs.mkdir(path.join(fixture, 'src', 'data'), { recursive: true });
await fs.mkdir(path.join(fixtureHome, '.claude', 'skills'), { recursive: true });
await fs.mkdir(path.join(fixtureHome, '.claude', 'commands'), { recursive: true });
await Promise.all([
  fs.copyFile(sourceScript, fixtureScript),
  fs.copyFile(sourceGenerated, fixtureGenerated),
  fs.copyFile(sourceCurated, path.join(fixture, 'src', 'data', 'skills-universe.ts')),
]);

const sourceHashBefore = sha256(await fs.readFile(sourceGenerated));
const fixtureHashBefore = sha256(await fs.readFile(fixtureGenerated));
const positive = run();
const fixtureHashAfterPositive = sha256(await fs.readFile(fixtureGenerated));

await fs.rename(fixtureGenerated, parkedGenerated);
const missing = run();
const missingStillAbsent = !(await fs.stat(fixtureGenerated).then(() => true).catch(() => false));
await fs.rename(parkedGenerated, fixtureGenerated);

await fs.rename(fixtureGenerated, parkedGenerated);
await fs.writeFile(fixtureGenerated, '');
const empty = run();
await fs.rename(fixtureGenerated, emptyGenerated);
await fs.rename(parkedGenerated, fixtureGenerated);

await fs.rename(fixtureGenerated, parkedGenerated);
await fs.mkdir(fixtureGenerated);
const directory = run();
await fs.rename(fixtureGenerated, directoryGenerated);
await fs.rename(parkedGenerated, fixtureGenerated);
const fixtureHashAfterControls = sha256(await fs.readFile(fixtureGenerated));
const sourceHashAfter = sha256(await fs.readFile(sourceGenerated));

const report = {
  fixture,
  sourceHome: fixtureHome,
  sourceHashBefore,
  sourceHashAfter,
  positive: record(positive),
  positivePreservedBytes: fixtureHashBefore === fixtureHashAfterPositive,
  missing: record(missing),
  missingStillAbsent,
  empty: record(empty),
  directory: record(directory),
  fixtureRestoredBytes: fixtureHashBefore === fixtureHashAfterControls,
};
await fs.writeFile(path.join(evidence, 'prebuild-empty-source-fail-closed-report-v3.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));

if (positive.status !== 0 || !report.positivePreservedBytes || missing.status === 0 || !missingStillAbsent || empty.status === 0 || directory.status === 0 || !report.fixtureRestoredBytes || sourceHashBefore !== sourceHashAfter) {
  process.exit(1);
}
