import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const evidenceDir = path.join(process.cwd(), '.g01-evidence', 'latest-artifact-smoke-20260915-1510');
const server = JSON.parse(await readFile(path.join(evidenceDir, 'server.json'), 'utf8'));
if (server.owned !== true || !Number.isInteger(server.pid) || server.host !== '127.0.0.1' || server.port !== 4381) {
  throw new Error('E_NOT_OWNED_SERVER_RECEIPT');
}
const result = await new Promise((resolve) => {
  execFile('taskkill.exe', ['/PID', String(server.pid), '/T', '/F'], (error, stdout, stderr) => {
    resolve({ code: error?.code ?? 0, signal: error?.signal ?? null, stdout, stderr });
  });
});
await writeFile(path.join(evidenceDir, 'server-stop.json'), `${JSON.stringify({ schema: 1, stoppedAt: new Date().toISOString(), targetPid: server.pid, ownedReceiptValidated: true, taskkill: result }, null, 2)}\n`);
process.exitCode = result.code === 0 ? 0 : 1;
