// Compress guide-logo PNGs (and emit WebP siblings) for faster Lighthouse perf.
// Lighthouse audit on /guide/kami flagged guide logos as the top opportunity:
// 14 PNGs at 400-580KB each = ~7MB. We:
//   1. Recompress the original PNG with palette quantization (loss-less alpha kept).
//   2. Emit a sibling .webp at quality 90 (Next.js Image will auto-serve when it
//      regenerates its image cache, but the .webp is also useful for any future
//      <picture> use).
//   3. Skip files <100KB (already optimal).
//   4. Idempotent — adds a sharp metadata "comment" so re-runs skip touched files.
//
// Run manually:  npm run compress:logos

import sharp from 'sharp';
import { readdir, readFile, writeFile, stat, access } from 'node:fs/promises';
import path from 'node:path';

const TARGET_DIR = path.resolve('public/images/guide-logos');
const SKIP_IF_UNDER_BYTES = 100_000; // 100KB — already optimal
const PNG_QUALITY = 90;
const WEBP_QUALITY = 90;
const IDEMPOTENT_TAG = 'compressed-by-compress-guide-logos';

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function isAlreadyCompressed(file) {
  // Use sharp's metadata to look for our tag — written via .withMetadata({ comments }).
  // Sharp doesn't expose comments directly via metadata(); fall back to filesize
  // heuristic combined with a sidecar marker.
  const markerPath = `${file}.compressed`;
  return await fileExists(markerPath);
}

async function markCompressed(file) {
  await writeFile(`${file}.compressed`, IDEMPOTENT_TAG);
}

async function compressOne(file) {
  const before = (await stat(file)).size;

  if (before < SKIP_IF_UNDER_BYTES) {
    return { file, before, afterPng: before, afterWebp: 0, skipped: true, reason: 'small' };
  }

  if (await isAlreadyCompressed(file)) {
    // still emit webp if missing
    const webpPath = file.replace(/\.png$/i, '.webp');
    let afterWebp = 0;
    if (await fileExists(webpPath)) {
      afterWebp = (await stat(webpPath)).size;
    }
    return { file, before, afterPng: before, afterWebp, skipped: true, reason: 'already' };
  }

  // Read source into a buffer first so we can safely overwrite on Windows
  // (sharp would otherwise keep the source file handle open).
  const input = await readFile(file);

  // 1. Optimized PNG (palette + max compression + alpha preserved)
  const pngBuf = await sharp(input)
    .png({ palette: true, quality: PNG_QUALITY, compressionLevel: 9, effort: 10 })
    .toBuffer();

  // Only overwrite if the new PNG is actually smaller
  let afterPng = before;
  if (pngBuf.length < before) {
    await writeFile(file, pngBuf);
    afterPng = pngBuf.length;
  }

  // 2. Sibling WebP (preserves alpha, much smaller for these gradient-heavy logos)
  const webpBuf = await sharp(input).webp({ quality: WEBP_QUALITY }).toBuffer();
  const webpPath = file.replace(/\.png$/i, '.webp');
  await writeFile(webpPath, webpBuf);

  await markCompressed(file);

  return {
    file,
    before,
    afterPng,
    afterWebp: webpBuf.length,
    skipped: false,
  };
}

const entries = await readdir(TARGET_DIR);
const files = entries
  .filter((f) => /\.png$/i.test(f))
  .map((f) => path.join(TARGET_DIR, f))
  .sort();

if (files.length === 0) {
  console.log(`No PNGs found in ${TARGET_DIR}`);
  process.exit(0);
}

console.log(`Compressing ${files.length} PNGs in ${TARGET_DIR}\n`);

let totalBefore = 0;
let totalAfterPng = 0;
let totalWebp = 0;
let processed = 0;
let skipped = 0;

for (const f of files) {
  try {
    const r = await compressOne(f);
    totalBefore += r.before;
    totalAfterPng += r.afterPng;
    totalWebp += r.afterWebp;

    const name = path.basename(r.file);
    if (r.skipped) {
      skipped++;
      console.log(
        `· ${name}: ${(r.before / 1024).toFixed(0)}KB (skipped: ${r.reason})${
          r.afterWebp ? `  webp=${(r.afterWebp / 1024).toFixed(0)}KB` : ''
        }`
      );
    } else {
      processed++;
      const pngDelta = r.before - r.afterPng;
      console.log(
        `✓ ${name}: PNG ${(r.before / 1024).toFixed(0)}KB → ${(r.afterPng / 1024).toFixed(0)}KB ` +
          `(-${(pngDelta / 1024).toFixed(0)}KB, -${((pngDelta / r.before) * 100).toFixed(0)}%)  ` +
          `WebP ${(r.afterWebp / 1024).toFixed(0)}KB`
      );
    }
  } catch (err) {
    console.error(`✗ ${path.basename(f)}: ${err.message}`);
  }
}

const pngSaved = totalBefore - totalAfterPng;
console.log(`\n──────────────────────────────────────────`);
console.log(`Processed: ${processed}, Skipped: ${skipped}`);
console.log(
  `PNG total: ${(totalBefore / 1024).toFixed(0)}KB → ${(totalAfterPng / 1024).toFixed(0)}KB ` +
    `(saved ${(pngSaved / 1024).toFixed(0)}KB, ${
      totalBefore > 0 ? ((pngSaved / totalBefore) * 100).toFixed(0) : 0
    }%)`
);
console.log(`WebP total: ${(totalWebp / 1024).toFixed(0)}KB (sibling files for <picture> / future use)`);
