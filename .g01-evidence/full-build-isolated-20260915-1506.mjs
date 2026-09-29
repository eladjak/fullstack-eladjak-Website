import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';

const repo = process.cwd();
const evidenceDir = path.join(repo, '.g01-evidence', 'full-build-isolated-20260915-1506');
const evidenceHome = path.join(evidenceDir, 'empty-userprofile');
await mkdir(evidenceHome, { recursive: true });

const env = { ...process.env, USERPROFILE: evidenceHome };
delete env.HOME;

function sha256(file) {
  return readFile(file).then((bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase());
}

function execute(file, args, label, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { cwd: repo, env, shell: false, ...options });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk) => { stdout += chunk; process.stdout.write(chunk); });
    child.stderr?.on('data', (chunk) => { stderr += chunk; process.stderr.write(chunk); });
    child.on('error', reject);
    child.on('close', async (code, signal) => {
      await writeFile(path.join(evidenceDir, `${label}.stdout.log`), stdout);
      await writeFile(path.join(evidenceDir, `${label}.stderr.log`), stderr);
      resolve({ code, signal, stdoutBytes: Buffer.byteLength(stdout), stderrBytes: Buffer.byteLength(stderr), pid: child.pid });
    });
  });
}

const startedAt = new Date().toISOString();
const tracked = [
  'scripts/generate-skills.mjs',
  'src/lib/mdx.ts',
  'src/data/skills-universe-generated.ts',
  'bun.lock',
];
const hashesBefore = Object.fromEntries(await Promise.all(tracked.map(async (relativePath) => [relativePath, await sha256(path.join(repo, relativePath))])));
const probe = await execute(process.execPath, ['-e', "process.stdout.write(require('node:os').homedir())"], 'home-probe');
const probeHome = await readFile(path.join(evidenceDir, 'home-probe.stdout.log'), 'utf8');
const homeVerified = probe.code === 0 && probe.signal === null && probeHome === evidenceHome;
const receipt = {
  schema: 1,
  startedAt,
  cwd: repo,
  evidenceHome,
  nodeExecutable: process.execPath,
  probe,
  probeHome,
  homeVerified,
  hashesBefore,
  command: ['bun', 'run', 'build'],
};

if (!homeVerified) {
  receipt.build = { skipped: true, reason: 'E_CHILD_HOME_MISMATCH' };
  receipt.hashesAfter = Object.fromEntries(await Promise.all(tracked.map(async (relativePath) => [relativePath, await sha256(path.join(repo, relativePath))])));
  receipt.finishedAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
  process.exitCode = 65;
} else {
  const build = await execute('bun', ['run', 'build'], 'build');
  receipt.build = build;
  receipt.hashesAfter = Object.fromEntries(await Promise.all(tracked.map(async (relativePath) => [relativePath, await sha256(path.join(repo, relativePath))])));
  receipt.finishedAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
  process.exitCode = build.code ?? 1;
}
