import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  page.on('console', message => { if (message.type() === 'error') console.log('CONSOLE', message.text().slice(0, 1000)); });
  page.on('requestfailed', request => console.log('FAILED', request.url(), request.failure()?.errorText));
  await page.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4381' ? route.continue() : route.abort());
  await page.goto('http://127.0.0.1:4381/guide/');
  console.log('FORM', await page.locator('#guide-search').evaluate(el => ({ form: el.form?.outerHTML, base: document.baseURI })));
  await page.locator('#guide-search').fill('Docker');
  await page.getByRole('button', { name: 'הצג תוצאות' }).click();
  await page.waitForURL(/q=Docker/, { timeout: 15000 }).catch(error => console.log(error.message));
  console.log('URL', page.url());
} finally { await browser.close(); }
