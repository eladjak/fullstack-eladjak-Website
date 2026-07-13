// Playwright slow-scroll verification for the cinematic journey.
// Confirms: (1) the per-leg camera transform (scale) actually moves as we scroll
// (zoom/dolly reads), (2) at every sampled depth at most two legs are visible and
// their opacities sum to ~1 (smooth crossfade, no black flash / no double-bright),
// (3) captures screenshots at each depth for a human eyeball pass.
// Runs desktop + mobile. Exit non-zero on any invariant break.
import { chromium, devices } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.CJ_URL || 'http://localhost:3141';
const OUT = 'scripts/cj-shots';
mkdirSync(OUT, { recursive: true });

// Sample the cinematic layer state from the live DOM.
function sampleFn() {
  const legs = Array.from(document.querySelectorAll('.cj-leg'));
  const read = (el) => {
    const s = getComputedStyle(el);
    const m = new DOMMatrixReadOnly(s.transform === 'none' ? '' : s.transform);
    return {
      opacity: parseFloat(s.opacity),
      scale: +Math.hypot(m.a, m.b).toFixed(4), // uniform-ish scale magnitude
      ty: +m.f.toFixed(2),
      tx: +m.e.toFixed(2),
      filter: s.filter,
    };
  };
  const legStates = legs.map(read);
  const scrim = document.querySelector('.cj-scrim');
  const bloom = scrim ? getComputedStyle(scrim).getPropertyValue('--cj-bloom').trim() : '';
  const visible = legStates.filter((l) => l.opacity > 0.01);
  const opSum = visible.reduce((a, l) => a + l.opacity, 0);
  // The scale the EYE sees = the scale of the most-opaque (dominant) visible leg.
  const dominant = visible.slice().sort((a, b) => b.opacity - a.opacity)[0];
  return {
    y: window.scrollY,
    domScale: dominant ? dominant.scale : 1,
    domTy: dominant ? dominant.ty : 0,
    visibleCount: visible.length,
    opSum: +opSum.toFixed(3),
    bloom,
  };
}

async function runProfile(name, contextOpts) {
  const browser = await chromium.launch();
  const context = await browser.newContext(contextOpts);
  const page = await context.newPage();
  const problems = [];
  const scaleSeen = new Set();

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let engine mount + posters/clips settle

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = await page.evaluate(() => window.innerHeight);
  const maxY = height - vh;
  const STEPS = 24;

  for (let i = 0; i <= STEPS; i++) {
    const target = Math.round((maxY * i) / STEPS);
    // Smooth incremental scroll so the eased follower and crossfade animate.
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), target);
    await page.waitForTimeout(260); // > follow-time so pEased catches up
    const s = await page.evaluate(sampleFn);
    scaleSeen.add(s.domScale);

    // Invariant 1: never more than 2 legs visible at once.
    if (s.visibleCount > 2) {
      problems.push(`[${name}] step ${i} y=${s.y}: ${s.visibleCount} legs visible (>2)`);
    }
    // Invariant 2: total visible opacity ~1 (no black gap, no double-bright).
    // Allow a little slack for the 0.12s bloom/opacity CSS transitions mid-sample.
    if (s.opSum > 0.02 && (s.opSum < 0.82 || s.opSum > 1.18)) {
      problems.push(`[${name}] step ${i} y=${s.y}: opacity sum ${s.opSum} (want ~1.0)`);
    }
    if (i % 4 === 0 || i === STEPS) {
      await page.screenshot({ path: `${OUT}/${name}-${String(i).padStart(2, '0')}.png` });
    }
    if (i % 6 === 0) {
      console.log(
        `[${name}] y=${String(s.y).padStart(5)} domScale=${s.domScale} domTy=${s.domTy} vis=${s.visibleCount} opSum=${s.opSum} bloom=${s.bloom || '-'}`,
      );
    }
  }

  // Invariant 3: the camera actually MOVES — the max leg scale must vary across
  // the scroll (a static/flat backdrop would show a single constant scale).
  const distinctScales = [...scaleSeen].sort((a, b) => a - b);
  const scaleRange = distinctScales[distinctScales.length - 1] - distinctScales[0];
  console.log(
    `[${name}] scale range across scroll: ${distinctScales[0]} → ${distinctScales[distinctScales.length - 1]} (Δ=${scaleRange.toFixed(4)}, ${distinctScales.length} distinct)`,
  );
  if (scaleRange < 0.05) {
    problems.push(`[${name}] camera barely moves — scale Δ=${scaleRange.toFixed(4)} (<0.05) — zoom not reading`);
  }

  await browser.close();
  return problems;
}

const all = [];
all.push(...(await runProfile('desktop', { viewport: { width: 1440, height: 900 } })));
all.push(...(await runProfile('mobile', { ...devices['iPhone 13'] })));

if (all.length) {
  console.error('\nVERIFY FAILED:');
  for (const p of all) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log('\n✓ VERIFY PASSED — camera moves, ≤2 legs visible, crossfade opacity sums ~1, shots in ' + OUT);
