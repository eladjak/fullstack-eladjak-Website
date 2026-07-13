/**
 * regrade-cinematic-violet.mjs — re-grade the cinematic-journey scene assets from
 * their (wrongly-generated) ROSE/MAGENTA palette to the SITE's brand VIOLET.
 *
 * WHY a duotone, not a hue-rotation: a global hue rotation of the rose footage
 * drags the near-neutral nebula/space tones into GREEN (magenta+120°≈green).
 * A luminance→violet DUOTONE remaps the whole tonal range onto a
 * black → brand-purple (#8B5CF6/#A78BFA family) → white ramp, so green is
 * mathematically impossible and every asset lands squarely on-brand while
 * keeping rich cinematic depth (deep violet blacks, purple mids, white cores).
 *
 * Applies the SAME grade to posters (.webp), source stills (.jpg) AND the
 * scrubbed video legs (.mp4 desktop + -m.mp4 mobile) so the paint-first poster
 * and the video that reveals over it are colour-matched.
 *
 * Originals are backed up to ./_rose-originals/ (once) before any overwrite.
 * Idempotent: re-running re-grades from the backed-up ROSE originals, never from
 * an already-graded file (so it can't compound).
 *
 * Usage:  node scripts/regrade-cinematic-violet.mjs
 * Deps:   ffmpeg on PATH (verified present).
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'public', 'videos', 'cinematic');
const BACKUP = join(DIR, '_rose-originals');

// The shared duotone: gray → per-channel curves onto a violet ramp, then a small
// saturation/contrast lift so it reads graded (not flat). Tuned on scene1/2/6.
// Blue leads, red follows, green held low → hue ≈ 258° (site --primary #8B5CF6).
const DUOTONE =
  "format=gray,format=rgb24," +
  "curves=r='0/0.02 0.5/0.42 1/0.98':g='0/0.01 0.5/0.30 1/0.95':b='0/0.05 0.5/0.62 1/1.0'," +
  "eq=saturation=1.12:contrast=1.06";

const ff = (args) =>
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

function ensureBackup() {
  if (!existsSync(BACKUP)) mkdirSync(BACKUP, { recursive: true });
}

// Return the ROSE-original path for a given asset: prefer the backup copy if it
// exists (so re-runs grade from the true original), else the live file (first run).
function sourceFor(file) {
  const b = join(BACKUP, file);
  return existsSync(b) ? b : join(DIR, file);
}

function backupOnce(file) {
  const b = join(BACKUP, file);
  if (!existsSync(b)) copyFileSync(join(DIR, file), b);
}

const IMG_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);
const VID_EXT = new Set(['.mp4']);

function regrade(file) {
  const ext = extname(file).toLowerCase();
  const out = join(DIR, file);
  // Back up the ROSE original FIRST, then always grade FROM the backup so input
  // and output are never the same path (ffmpeg refuses in==out) and re-runs never
  // compound (they re-grade the true original, not an already-graded file).
  backupOnce(file);
  const src = sourceFor(file);

  if (IMG_EXT.has(ext)) {
    ff(['-i', src, '-vf', DUOTONE, out]);
  } else if (VID_EXT.has(ext)) {
    // Re-encode h264, keep source pix_fmt/fps; crf tuned to hold the ~6Mbps look.
    ff([
      '-i', src,
      '-vf', DUOTONE,
      '-c:v', 'libx264',
      '-crf', '20',
      '-preset', 'slow',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      out,
    ]);
  }
  console.log('graded', file);
}

function main() {
  ensureBackup();
  // Only touch the scene* posters/videos + still* source frames — nothing else.
  const files = readdirSync(DIR).filter((f) => {
    const b = basename(f).toLowerCase();
    return (b.startsWith('scene') || b.startsWith('still')) && !f.startsWith('_');
  });
  // Grade images first (fast) so the poster set is done even if video encode is slow.
  const imgs = files.filter((f) => IMG_EXT.has(extname(f).toLowerCase()));
  const vids = files.filter((f) => VID_EXT.has(extname(f).toLowerCase()));
  [...imgs, ...vids].forEach(regrade);
  console.log(`\nDone: ${imgs.length} images + ${vids.length} videos re-graded to brand violet.`);
  console.log(`Rose originals preserved in ${BACKUP}`);
}

main();
