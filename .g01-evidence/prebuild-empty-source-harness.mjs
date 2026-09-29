import { promises as fs } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(evidence, '..');
const fixture = path.join(evidence, 'prebuild-empty-source-fixture');
const sourceScript = path.join(root, 'scripts', 'generate-skills.mjs');
const sourceGenerated = path.join(root, 'src', 'data', 'skills-universe-generated.ts');
const sourceCurated = path.join(root, 'src', 'data', 'skills-universe.ts');
const fixtureScript = path.join(fixture, 'scripts', 'generate-skills.mjs');
const fixtureGenerated = path.join(fixture, 'src', 'data', 'skills-universe-generated.ts');
const fixtureCurated = path.join(fixture, 'src', 'data', 'skills-universe.ts');
const fixtureHome = path.join(fixture, 'empty-user');

const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const run = (args) => spawnSync(process.execPath, args, {
  cwd: fixture,
  encoding: 'utf8',
  env: { ...process.env, USERPROFILE: fixtureHome },
});
const record = (name, result) => ({
  name,
  status: result.status,
  signal: result.signal,
  stdout: result.stdout,
  stderr: result.stderr,
});

await fs.rm(fixture, { recursive: true, force: true });
await fs.mkdir(path.join(fixture, 'scripts'), { recursive: true });
await fs.mkdir(path.join(fixture, 'src', 'data'), { recursive: true });
await fs.mkdir(path.join(fixtureHome, '.claude', 'skills'), { recursive: true });
await fs.mkdir(path.join(fixtureHome, '.claude', 'commands'), { recursive: true });
await Promise.all([
  fs.copyFile(sourceScript, fixtureScript),
  fs.copyFile(sourceGenerated, fixtureGenerated),
  fs.copyFile(sourceCurated, fixtureCurated),
]);

const originalRepoHash = sha256(await fs.readFile(sourceGenerated));
const fixtureBefore = sha256(await fs.readFile(fixtureGenerated));
const homedir = run(['-e', "const os=require('node:os'); process.stdout.write(os.homedir())"]);
const expectedHome = fixtureHome;
const homedirMatches = homedir.status === 0 && homedir.stdout === expectedHome;
if (!homedirMatches) {
  throw new Error(`Refusing generator run: os.homedir()=${JSON.stringify(homedir.stdout)}, expected=${JSON.stringify(expectedHome)}`);
}

const positive = run([fixtureScript]);
await fs.writeFile(path.join(fixture, 'positive.stdout.log'), positive.stdout);
await fs.writeFile(path.join(fixture, 'positive.stderr.log'), positive.stderr);
const fixtureAfterPositive = sha256(await fs.readFile(fixtureGenerated));

await fs.rm(fixtureGenerated, { force: true });
const negative = run([fixtureScript]);
await fs.writeFile(path.join(fixture, 'negative.stdout.log'), negative.stdout);
await fs.writeFile(path.join(fixture, 'negative.stderr.log'), negative.stderr);
const fixtureOutputExistsAfterNegative = await fs.access(fixtureGenerated).then(() => true).catch(() => false);
const originalRepoHashAfter = sha256(await fs.readFile(sourceGenerated));

const report = {
  fixture,
  expectedHome,
  homedir: record('homedir-probe', homedir),
  homedirMatches,
  originalRepoHash,
  originalRepoHashAfter,
  fixtureBefore,
  positive: record('empty-sources-present-catalog', positive),
  fixtureAfterPositive,
  positivePreservedBytes: fixtureBefore === fixtureAfterPositive,
  negative: record('empty-sources-missing-catalog', negative),
  fixtureOutputExistsAfterNegative,
  negativeMisleadingSuccess: negative.status === 0 && !fixtureOutputExistsAfterNegative,
};
await fs.writeFile(path.join(evidence, 'prebuild-empty-source-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (positive.status !== 0 || !report.positivePreservedBytes || originalRepoHash !== originalRepoHashAfter) process.exit(1);
