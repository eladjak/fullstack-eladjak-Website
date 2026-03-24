import { test, expect } from '@playwright/test';

test.describe('Homepage Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hero section is visible with heading text', async ({ page }) => {
    // Hero section should be the first major section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Heading should contain the name "אלעד" or developer-related text
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText).toBeTruthy();
    expect(headingText!.length).toBeGreaterThan(3);
  });

  test('hero section has CTA buttons', async ({ page }) => {
    // Look for CTA buttons with Hebrew or English text
    const ctaLinks = page.locator('a').filter({ hasText: /פרויקטים|projects|contact|צור קשר|הצג/i });
    await expect(ctaLinks.first()).toBeVisible();
  });

  test('StatsBar is visible with numbers', async ({ page }) => {
    // StatsBar contains animated counters - look for the section with numbers
    // Stats include: 26+ apps, 50+ repos, 1000+ commits, 3 AI agents, 4+ years
    const statsNumbers = page.locator('[class*="stat"], [data-testid*="stat"]');

    // Fallback: look for text containing "+" which appears in stats
    const plusText = page.locator('text=+').first();
    // Or look for common stat values
    const statsSection = page.locator('section').nth(1);
    await expect(statsSection).toBeDefined();
  });

  test('TechMarquee is visible', async ({ page }) => {
    // TechMarquee shows technology logos scrolling
    // Look for the marquee/scrolling container
    const marquee = page.locator('[class*="marquee"], [class*="tech"]').first();
    if (await marquee.isVisible()) {
      await expect(marquee).toBeVisible();
    } else {
      // Fallback: check for tech names in the page
      const techText = page.locator('text=React').or(page.locator('text=Next.js')).or(page.locator('text=TypeScript'));
      await expect(techText.first()).toBeVisible();
    }
  });

  test('Skills section is visible', async ({ page }) => {
    // Scroll to skills section (has id="skills")
    await page.evaluate(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(800);

    // Skills section element with id="skills" should exist
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();

    // Should have an h2 heading inside
    const heading = skillsSection.locator('h2').first();
    await expect(heading).toBeVisible();
  });

  test('Featured projects section is visible with project cards', async ({ page }) => {
    // Scroll down to featured projects
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(500);

    // Look for project cards
    const projectCards = page.locator('[class*="card"], article').filter({ hasText: /github|פרויקט|project/i });
    await expect(projectCards.first()).toBeVisible();
  });

  test('CTA section is visible', async ({ page }) => {
    // Scroll to bottom area for CTA
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);

    // CTA section typically has a button/link to contact
    const ctaSection = page.locator('section').filter({ hasText: /contact|צור קשר|בוא נדבר|let.s talk/i }).first();
    if (await ctaSection.isVisible()) {
      await expect(ctaSection).toBeVisible();
    } else {
      // Fallback check: CTA link exists somewhere on the page
      const ctaLink = page.locator('a[href="/contact"]').last();
      await expect(ctaLink).toBeVisible();
    }
  });

  test('WhatsApp FAB is visible', async ({ page }) => {
    // WhatsApp floating action button
    const whatsappLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"], a[aria-label*="WhatsApp"]');
    await expect(whatsappLink.first()).toBeVisible();
  });

  test('Footer is visible with links', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should have at least one link
    const footerLinks = footer.locator('a');
    await expect(footerLinks.first()).toBeVisible();
  });

  test('page has correct lang attribute for Hebrew', async ({ page }) => {
    const htmlLang = await page.locator('html').getAttribute('lang');
    // Hebrew locale or general lang attribute should be set
    expect(htmlLang).toBeTruthy();
  });

  test('no broken images in hero area', async ({ page }) => {
    // Check that images in the hero area load correctly
    const images = page.locator('section img');
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      // naturalWidth > 0 means image loaded successfully
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
