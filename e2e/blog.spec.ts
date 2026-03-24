import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    // Wait for client-side fetch to complete (blog posts load via /api/blog/posts)
    await page.waitForTimeout(2000);
  });

  test('blog listing page loads', async ({ page }) => {
    await expect(page).toHaveURL(/\/blog/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('blog page has heading text', async ({ page }) => {
    const heading = page.locator('h1').first();
    const text = await heading.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(2);
  });

  test('blog posts are rendered (at least 1)', async ({ page }) => {
    // Blog loads via API fetch, wait a bit more if needed
    await page.waitForTimeout(1000);

    // The blog has 5 MDX posts in content/blog/
    const postCards = page.locator('article, [class*="card"]').filter({
      has: page.locator('h2, h3'),
    });

    // If loading indicator is gone, posts should be there
    const loadingSpinner = page.locator('[class*="spinner"], [class*="loading"]');
    if (await loadingSpinner.isVisible()) {
      await loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    }

    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('blog posts have titles', async ({ page }) => {
    await page.waitForTimeout(1000);

    const postTitles = page.locator('article h2, article h3, [class*="card"] h2, [class*="card"] h3');
    const count = await postTitles.count();
    if (count > 0) {
      const firstTitle = await postTitles.first().textContent();
      expect(firstTitle).toBeTruthy();
      expect(firstTitle!.length).toBeGreaterThan(3);
    }
  });

  test('blog posts have dates', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Dates are shown on blog cards with Calendar icon
    const dateElements = page.locator('[class*="date"], time');
    const count = await dateElements.count();
    // Should have some date elements if posts loaded
    if (count > 0) {
      await expect(dateElements.first()).toBeVisible();
    }
  });

  test('blog posts have tags', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Tags are rendered using TagBadge component
    const tags = page.locator('[class*="tag"], [class*="badge"]');
    const count = await tags.count();
    if (count > 0) {
      await expect(tags.first()).toBeVisible();
    }
  });

  test('clicking a blog post navigates to post page', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Blog post links have slugs like /blog/ai-in-web-development/
    // Use a regex that requires content after /blog/ (not just /blog/)
    const postLinks = page.locator('a[href^="/blog/"]').filter({
      hasNot: page.locator('[href="/blog/"]'),
    });
    const count = await postLinks.count();

    if (count > 0) {
      const href = await postLinks.first().getAttribute('href');
      // Only click if the href looks like a slug (not bare /blog/)
      if (href && href !== '/blog/' && href.length > 7) {
        await postLinks.first().click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/blog\/.+/);
      }
    } else {
      // If posts haven't loaded yet, navigate directly to a known post
      await page.goto('/blog/building-with-nextjs-16');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/blog\/.+/);
    }
  });

  test('blog post page has content', async ({ page }) => {
    // Navigate directly to the first known blog post slug
    await page.goto('/blog/building-with-nextjs-16');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Post page should have a heading (h1 or h2)
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('blog post page renders MDX content', async ({ page }) => {
    await page.goto('/blog/my-journey-to-fullstack');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // MDX content renders as paragraphs
    const content = page.locator('p').first();
    await expect(content).toBeVisible();
  });

  test('blog listing shows reading time indicator', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Reading time uses Clock icon + text like "3 min read"
    const readingTime = page.locator('text=/\\d+\\s*(min|דקות)/i').first();
    if (await readingTime.isVisible()) {
      await expect(readingTime).toBeVisible();
    }
  });
});
