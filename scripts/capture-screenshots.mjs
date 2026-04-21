import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'public', 'projects');

const projects = [
  { id: 'haderech', url: 'https://haderech-next.vercel.app' },
  { id: 'portfolio', url: 'https://fullstack-eladjak.co.il' },
  { id: 'ey-ai-kids', url: 'https://sipurai.ai' },
  { id: 'omanut', url: 'https://omanut-hakesher-website.vercel.app' },
  { id: 'bayit-beseder', url: 'https://www.bayitbeseder.com' },
  { id: 'html-to-pptx', url: 'https://html-to-pptx-ten.vercel.app' },
  { id: 'hebrew-calendar', url: 'https://hebrew-calendar-eosin.vercel.app' },
  { id: 'vacation-vibe', url: 'https://vacation-vibe-pi.vercel.app' },
  { id: 'team-meetings', url: 'https://team-meetings.vercel.app' },
  { id: 'customer-crm', url: 'https://customer-crm-tau.vercel.app' },
];

async function captureScreenshot(browser, project) {
  const page = await browser.newPage();
  try {
    // Set viewport to 1280x800 for nice desktop screenshots
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log(`Capturing ${project.id} from ${project.url}...`);
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait a bit for animations/fonts to load
    await page.waitForTimeout(2000);

    const outputPath = join(outputDir, `${project.id}.png`);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`  ✓ Saved ${project.id}.png`);
    return { id: project.id, success: true };
  } catch (error) {
    console.error(`  ✗ Failed ${project.id}: ${error.message}`);
    return { id: project.id, success: false, error: error.message };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  // Run 3 at a time to avoid overwhelming the browser
  const results = [];
  const batchSize = 3;

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(p => captureScreenshot(browser, p))
    );
    results.push(...batchResults);
  }

  await browser.close();

  console.log('\n--- Results ---');
  const succeeded = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  console.log(`✓ Succeeded: ${succeeded.length}/${results.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.map(f => `${f.id} (${f.error})`).join(', ')}`);
  }
}

main().catch(console.error);
