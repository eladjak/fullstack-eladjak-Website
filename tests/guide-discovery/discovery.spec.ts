import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.origin === 'http://127.0.0.1:4381' || url.protocol === 'data:'
      ? route.continue()
      : route.abort();
  });
});

test('Hebrew: keyboard search, category intersection, empty state and reset on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/guide/');
  const search = page.locator('#guide-search');
  await expect(search).toBeVisible();
  await search.fill('Docker');
  await page.locator('#guide-category').selectOption('infra');
  await Promise.all([
    page.waitForURL(/(?:\?|&)q=Docker(?:&|$)/, { waitUntil: 'commit' }),
    search.press('Enter'),
  ]);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('a[href="/guide/docker/"]')).toBeVisible();
  await expect(page.locator('a[href="/guide/kaylee/"]')).toHaveCount(0);
  await page.locator('#guide-search').fill('no-such-guide-20260915');
  await page.locator('#guide-category').selectOption('agent');
  await page.getByRole('button', { name: 'הצג תוצאות' }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { name: 'לא נמצאו מדריכים מתאימים' })).toBeVisible();
  await page.getByRole('link', { name: 'הצג את כל המדריכים' }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#guide-search')).toHaveValue('');
  await expect(page.locator('a[href="/guide/kami/"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('English: first repeated query wins, invalid category normalizes, no-match resets', async ({ page }) => {
  await page.goto('/en/guide/?q=Docker&q=Kami&category=invalid');
  await expect(page.locator('#guide-search')).toHaveValue('Docker');
  await expect(page.locator('#guide-category')).toHaveValue('all');
  await expect(page.locator('a[href="/en/guide/docker/"]')).toBeVisible();
  await page.locator('#guide-search').fill('no-such-guide-20260915');
  await Promise.all([
    page.waitForURL(/q=no-such-guide-20260915/, { waitUntil: 'commit' }),
    page.locator('#guide-search').press('Enter'),
  ]);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('a[href="/en/guide/docker/"]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No matching guides found' })).toBeVisible();
  await page.locator('form').getByRole('link').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#guide-search')).toHaveValue('');
});

test('guide links and search remain usable with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4381' ? route.continue() : route.abort());
  const page = await context.newPage();
  try {
    const response = await page.goto('http://127.0.0.1:4381/guide/?q=Kami');
    expect(response?.headers()['content-security-policy']).toMatch(/script-src[^;]*'nonce-[^']+'/);
    await expect(page.locator('a[href="/guide/kami/"]')).toBeVisible();
    await page.locator('#guide-search').fill('no-such-guide-20260915');
    await Promise.all([
      page.waitForURL(/q=no-such-guide-20260915/, { waitUntil: 'commit' }),
      page.getByRole('button', { name: 'הצג תוצאות' }).click(),
    ]);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'לא נמצאו מדריכים מתאימים' })).toBeVisible();
    const resetNavigation = page.waitForURL(
      (url) =>
        url.origin === 'http://127.0.0.1:4381' &&
        url.pathname === '/guide/' &&
        url.search === '',
      { waitUntil: 'commit', timeout: 10000 },
    );
    await page.getByRole('link', { name: 'הצג את כל המדריכים' }).click({
      timeout: 5000,
      noWaitAfter: true,
    });
    await resetNavigation;
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#guide-search')).toHaveValue('');
    await expect(page.locator('a[href="/guide/kami/"]')).toBeVisible();
  } finally {
    await context.close();
  }
});
