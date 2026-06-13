import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:3002';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
// Seed localStorage locale = en before app loads
await context.addInitScript(() => {
  try { localStorage.setItem('portfolio-locale', 'en'); } catch (e) {}
});
const page = await context.newPage();
await page.setViewportSize({ width: 1366, height: 900 });

const missing = [];
page.on('console', (msg) => {
  const text = msg.text();
  if (/MISSING_MESSAGE|IntlError|could not resolve/i.test(text)) missing.push(text);
});

try {
  await page.goto(`${base}/projects`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'docs/screenshots/projects-after-en-forced.png', fullPage: false });
  // Read a couple of titles to confirm EN text present
  const titles = await page.locator('h3').allInnerTexts();
  console.log('sample card titles:', titles.slice(0, 6).join(' | '));
  console.log('missing-message errors:', missing.length);
  if (missing.length) console.log(missing.slice(0, 5).join('\n'));
  console.log('EN VERIFY DONE');
} catch (e) {
  console.error('en verify fail:', e.message);
} finally {
  await browser.close();
}
