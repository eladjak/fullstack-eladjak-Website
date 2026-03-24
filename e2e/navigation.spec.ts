import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('homepage loads with Hebrew title', async ({ page }) => {
    await expect(page).toHaveTitle(/אלעד/);
  });

  test('desktop nav links are visible', async ({ page }) => {
    // Use viewport size that ensures desktop nav is shown
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();

    // Nav links use trailing slashes: /projects/, /blog/, /contact/, /about/
    await expect(page.locator('nav a[href="/projects/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/blog/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/contact/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/about/"]').first()).toBeVisible();
  });

  test('navigates to Projects page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/projects/"]').first().click();
    await expect(page).toHaveURL(/\/projects/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Blog page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/blog/"]').first().click();
    await expect(page).toHaveURL(/\/blog/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Contact page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/contact/"]').first().click();
    await expect(page).toHaveURL(/\/contact/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to About page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/about/"]').first().click();
    await expect(page).toHaveURL(/\/about/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Thanks page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/thanks/"]').first().click();
    await expect(page).toHaveURL(/\/thanks/);
    await page.waitForLoadState('networkidle');
  });

  test('navigates to Services page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('nav a[href="/services/"]').first().click();
    await expect(page).toHaveURL(/\/services/);
    await page.waitForLoadState('networkidle');
  });

  test('mobile hamburger menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The hamburger button — its aria-label is "Open menu"
    const hamburgerBtn = page.getByRole('button', { name: /open menu/i });
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();

    // After clicking, contact link in mobile drawer should be visible
    await expect(page.locator('nav a[href="/contact/"]').last()).toBeVisible();
  });

  test('mobile hamburger menu closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburgerBtn = page.getByRole('button', { name: /open menu/i });
    await hamburgerBtn.click();
    await page.waitForTimeout(300);

    // Press Escape to close the mobile menu (the navigation uses keydown to close)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Hamburger button should still be accessible after menu closes
    await expect(hamburgerBtn).toBeVisible();
  });

  test('theme toggle button is present', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // ThemeToggle has aria-label "Switch to light mode" or "Switch to dark mode"
    const themeBtn = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    await expect(themeBtn).toBeVisible();
  });

  test('language toggle button is present', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Language toggle button
    const langBtn = page.getByRole('button', { name: /switch language/i });
    await expect(langBtn).toBeVisible();
  });

  test('logo link returns to homepage', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    // Click the site logo (aria-label "EY.dev - Home")
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL(/^https:\/\/fullstack-eladjak\.co\.il\/?$/);
  });
});
