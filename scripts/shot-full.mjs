import { chromium } from 'playwright';

const url = process.argv[2];
const out = process.argv[3] || 'full';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
try {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `docs/screenshots/${out}.png`, fullPage: true });
  console.log(`saved ${out}.png`);
} catch (e) {
  console.error('fail:', e.message);
} finally {
  await browser.close();
}
