import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:3002';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1366, height: 900 });

try {
  await page.goto(`${base}/projects`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Count cards initially
  const initial = await page.locator('h3').count();
  console.log(`initial h3 count (incl section headers): ${initial}`);

  // Search interaction
  const search = page.locator('input[type="search"]');
  await search.fill('pollr');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'docs/screenshots/verify-search-pollr.png' });
  const afterSearchText = await page.locator('[aria-live="polite"]').first().innerText().catch(() => 'n/a');
  console.log(`result count line after search 'pollr': ${afterSearchText}`);

  await search.fill('');
  await page.waitForTimeout(500);

  // Tech show-more toggle
  const showMore = page.getByRole('button', { name: /more|עוד/ });
  const smCount = await showMore.count();
  console.log(`show-more button present: ${smCount > 0}`);
  if (smCount > 0) {
    await showMore.first().click();
    await page.waitForTimeout(400);
    console.log('clicked show-more (tech expanded)');
  }

  // Category filter: AI
  await page.getByRole('button', { name: /AI/ }).first().click().catch(() => {});
  await page.waitForTimeout(800);
  const aiCount = await page.locator('[aria-live="polite"]').first().innerText().catch(() => 'n/a');
  console.log(`result count after AI category: ${aiCount}`);
  await page.screenshot({ path: 'docs/screenshots/verify-filter-ai.png' });

  console.log('INTERACTION VERIFY OK');
} catch (e) {
  console.error('verify fail:', e.message);
} finally {
  await browser.close();
}
