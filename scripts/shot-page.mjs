import { chromium } from 'playwright';

const url = process.argv[2] || 'https://fullstack-eladjak.co.il/projects';
const prefix = process.argv[3] || 'projects-before';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
try {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `docs/screenshots/${prefix}-desktop.png`, fullPage: false });
  console.log(`saved ${prefix}-desktop.png`);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `docs/screenshots/${prefix}-mobile.png`, fullPage: false });
  console.log(`saved ${prefix}-mobile.png`);
} catch (e) {
  console.error('shot failed:', e.message);
} finally {
  await browser.close();
}
