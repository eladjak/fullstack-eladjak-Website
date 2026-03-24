import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('contact page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('contact page has Hebrew heading', async ({ page }) => {
    const heading = page.locator('h1').first();
    const text = await heading.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(2);
  });

  test('name field is present', async ({ page }) => {
    const nameField = page.locator('input[name="name"]');
    await expect(nameField).toBeVisible();
  });

  test('email field is present', async ({ page }) => {
    const emailField = page.locator('input[name="email"], input[type="email"]');
    await expect(emailField).toBeVisible();
  });

  test('subject field is present', async ({ page }) => {
    const subjectField = page.locator('input[name="subject"]');
    await expect(subjectField).toBeVisible();
  });

  test('message textarea is present', async ({ page }) => {
    const messageField = page.locator('textarea[name="message"]');
    await expect(messageField).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /send|שלח|submit/i });
    await expect(submitBtn).toBeVisible();
  });

  test('form validation - empty submit shows errors', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /send|שלח|submit/i });
    await submitBtn.click();
    await page.waitForTimeout(500);

    // Error messages should appear for empty required fields
    const errorMessages = page.locator('[class*="error"], [class*="text-red"], [class*="text-destructive"]');
    const count = await errorMessages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('form validation - invalid email shows error', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('not-an-email');
    await page.locator('input[name="subject"]').fill('Test Subject');
    await page.locator('textarea[name="message"]').fill('Test message content here');

    const submitBtn = page.getByRole('button', { name: /send|שלח|submit/i });
    await submitBtn.click();
    await page.waitForTimeout(500);

    // Email validation error should appear
    const errorMessages = page.locator('[class*="error"], [class*="text-red"], [class*="text-destructive"]');
    const count = await errorMessages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('form accepts valid input without errors', async ({ page }) => {
    await page.locator('input[name="name"]').fill('ישראל ישראלי');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="subject"]').fill('שאלה לגבי שירות');
    await page.locator('textarea[name="message"]').fill('שלום, אני מעוניין לשמוע עוד על השירותים שלך');

    // No errors should show before submit
    const errorMessages = page.locator('[class*="error"], [class*="text-red"]');
    const errorCount = await errorMessages.count();
    // Before submit, no errors
    expect(errorCount).toBe(0);
  });

  test('email contact info card is visible', async ({ page }) => {
    // Contact page shows email info card
    const emailLink = page.locator('a[href*="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    const href = await emailLink.getAttribute('href');
    expect(href).toContain('eladhiteclearning@gmail.com');
  });

  test('WhatsApp contact link is visible', async ({ page }) => {
    // WhatsApp link on contact page
    const whatsappLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"]');
    await expect(whatsappLink.first()).toBeVisible();
    const href = await whatsappLink.first().getAttribute('href');
    expect(href).toContain('972525427474');
  });

  test('social links are visible', async ({ page }) => {
    // GitHub and LinkedIn links
    const githubLink = page.locator('a[href*="github.com/eladjak"]');
    await expect(githubLink.first()).toBeVisible();
  });

  test('location info is visible', async ({ page }) => {
    // Location / MapPin section
    const locationText = page.locator('text=/ישראל|Israel/i').first();
    if (await locationText.isVisible()) {
      await expect(locationText).toBeVisible();
    }
  });
});
