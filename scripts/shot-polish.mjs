import { chromium } from 'playwright';

/**
 * shot-polish.mjs — before/after visual-polish capture for the cinematic home.
 *
 * Usage:
 *   node scripts/shot-polish.mjs <url> <outDir> <prefix> [reduce]
 *
 * Captures the key cinematic scenes at desktop + mobile by scrolling to fixed
 * fractions of the page, plus a reduced-motion static shot. Deterministic waits
 * so the eased flight settles before each frame.
 */

const url = process.argv[2];
const outDir = process.argv[3];
const prefix = process.argv[4] || 'shot';
const reduceOnly = process.argv[5] === 'reduce';

if (!url || !outDir) {
  console.error('usage: node scripts/shot-polish.mjs <url> <outDir> <prefix> [reduce]');
  process.exit(1);
}

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

// Scene scroll fractions (approx anchor centres along the page).
const SCENES = [
  ['hero', 0.0],
  ['stats', 0.09],
  ['fleet', 0.3],
  ['projects', 0.52],
  ['trust', 0.74],
  ['gate', 0.97],
];

async function settleScroll(page, frac) {
  await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.round(max * f), behavior: 'auto' });
  }, frac);
  // Let the critically-damped flight + caption fades converge.
  await page.waitForTimeout(1400);
}

async function shootSet(browser, viewport, tag, reduce) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: reduce ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);

  if (reduce) {
    await page.screenshot({ path: `${outDir}/${prefix}-${tag}-reduced-motion.png` });
    console.log(`saved ${prefix}-${tag}-reduced-motion.png`);
    await ctx.close();
    return;
  }

  for (const [name, frac] of SCENES) {
    await settleScroll(page, frac);
    await page.screenshot({ path: `${outDir}/${prefix}-${tag}-${name}.png` });
    console.log(`saved ${prefix}-${tag}-${name}.png`);
  }
  await ctx.close();
}

const browser = await chromium.launch({ headless: true });
try {
  if (reduceOnly) {
    await shootSet(browser, DESKTOP, 'desktop', true);
  } else {
    await shootSet(browser, DESKTOP, 'desktop', false);
    await shootSet(browser, MOBILE, 'mobile', false);
    await shootSet(browser, DESKTOP, 'desktop', true);
  }
} catch (e) {
  console.error('fail:', e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
