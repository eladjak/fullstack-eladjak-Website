import sharp from 'sharp';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const TARGET_DIR = path.resolve('public/images/guides');
const TARGET_QUALITY = 80;
const MAX_WIDTH = 1600;
const SKIP_IF_UNDER_BYTES = 250_000; // 250KB — assume already compressed

async function compress(file) {
  const before = (await stat(file)).size;
  if (before < SKIP_IF_UNDER_BYTES) return { file, before, after: before, skipped: true };
  // Read source into a buffer first so we can safely overwrite on Windows
  // (sharp would otherwise keep the source file handle open during writeFile).
  const input = await readFile(file);
  const buf = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: TARGET_QUALITY, mozjpeg: true })
    .toBuffer();
  await writeFile(file, buf);
  return { file, before, after: buf.length, skipped: false };
}

const files = (await readdir(TARGET_DIR))
  .filter((f) => /\.jpe?g$/i.test(f))
  .map((f) => path.join(TARGET_DIR, f));

let totalBefore = 0;
let totalAfter = 0;
for (const f of files) {
  const r = await compress(f);
  totalBefore += r.before;
  totalAfter += r.after;
  console.log(
    `${r.skipped ? '·' : '✓'} ${path.basename(r.file)}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB${r.skipped ? ' (skipped)' : ''}`
  );
}
console.log(
  `\nTotal: ${(totalBefore / 1024).toFixed(0)}KB → ${(totalAfter / 1024).toFixed(0)}KB (saved ${((totalBefore - totalAfter) / 1024).toFixed(0)}KB, ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
