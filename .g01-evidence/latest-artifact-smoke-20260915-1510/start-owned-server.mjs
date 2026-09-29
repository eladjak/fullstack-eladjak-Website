import { openSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const repo = process.cwd();
const evidenceDir = path.join(repo, '.g01-evidence', 'latest-artifact-smoke-20260915-1510');
await mkdir(evidenceDir, { recursive: true });
const stdout = openSync(path.join(evidenceDir, 'server.stdout.log'), 'a');
const stderr = openSync(path.join(evidenceDir, 'server.stderr.log'), 'a');
const child = spawn('bun', ['run', 'start', '--', '-H', '127.0.0.1', '-p', '4381'], {
  cwd: repo,
  detached: true,
  shell: false,
  stdio: ['ignore', stdout, stderr],
});
const receipt = {
  schema: 1,
  owned: true,
  startedAt: new Date().toISOString(),
  pid: child.pid,
  command: ['bun', 'run', 'start', '--', '-H', '127.0.0.1', '-p', '4381'],
  host: '127.0.0.1',
  port: 4381,
};
child.on('error', async (error) => {
  receipt.startError = { name: error.name, message: error.message };
  receipt.errorAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'server.json'), `${JSON.stringify(receipt, null, 2)}\n`);
});
await writeFile(path.join(evidenceDir, 'server.json'), `${JSON.stringify(receipt, null, 2)}\n`);
child.unref();
