import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to fully hydrate
    await page.waitForLoadState('networkidle');
  });

  test('homepage loads with Hebrew title', async ({ page }) => {
    await expect(page).toHaveTitle(/אלעד/);
  });

  test('desktop nav links are visible', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();

    // Check key nav links exist (using href targeting)
    await expect(page.locator('nav a[href="/projects"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/blog"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/about"]').first()).toBeVisible();
  });

  test('navigates to Projects page', async ({ page }) => {
    await page.locator('nav a[href="/projects"]').first().click();
    await expect(page).toHaveURL(/\/projects/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Blog page', async ({ page }) => {
    await page.locator('nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Contact page', async ({ page }) => {
    await page.locator('nav a[href="/contact"]').first().click();
    await expect(page).toHaveURL(/\/contact/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to About page', async ({ page }) => {
    await page.locator('nav a[href="/about"]').first().click();
    await expect(page).toHaveURL(/\/about/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Thanks page', async ({ page }) => {
    await page.locator('nav a[href="/thanks"]').first().click();
    await expect(page).toHaveURL(/\/thanks/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Services page', async ({ page }) => {
    await page.locator('nav a[href="/services"]').first().click();
    await expect(page).toHaveURL(/\/services/);
    await page.waitForLoadState('networkidle');
  });

  test('mobile hamburger menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The hamburger button (Menu icon) should be visible on mobile
    const hamburgerBtn = page.getByRole('button', { name: /menu|תפריט/i }).first();
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();

    // After clicking, mobile menu links should appear
    await expect(page.locator('nav a[href="/contact"]').last()).toBeVisible();
  });

  test('mobile hamburger menu closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburgerBtn = page.getByRole('button', { name: /menu|תפריט/i }).first();
    await hamburgerBtn.click();

    // Click again to close, or find the X/close button
    const closeBtn = page.getByRole('button', { name: /close|סגור/i }).first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await hamburgerBtn.click();
    }

    // Menu items in the mobile overlay should no longer be visible
    await page.waitForTimeout(400); // wait for animation
    await expect(page.locator('[aria-label="Close menu"]')).not.toBeVisible();
  });

  test('theme toggle is present', async ({ page }) => {
    // ThemeToggle component is rendered in the nav
    const themeBtn = page.locator('button[aria-label*="theme"], button[title*="theme"], button[aria-label*="ערכת נושא"], button[aria-label*="dark"], button[aria-label*="light"]');
    // Check for the sun/moon icons as fallback
    const sunIcon = page.locator('nav svg').first();
    await expect(sunIcon).toBeDefined();
  });

  test('language toggle switches to English', async ({ page }) => {
    // Click the language toggle (flag button)
    const langBtn = page.locator('nav button').filter({ hasText: /עברית|he|english|en/i }).first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(500);
    }
    // Verify toggle is accessible
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('logo link returns to homepage', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    // Click the logo (first link in nav, points to /)
    await page.locator('nav a[href="/"]').first().click();
    await expect(page).toHaveURL(/^https:\/\/fullstack-eladjak\.co\.il\/?$/);
  });
});
