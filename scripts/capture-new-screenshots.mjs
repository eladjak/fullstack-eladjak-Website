import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'public', 'projects');

// New / updated projects to capture. id = output filename base.
const projects = [
  { id: 'ninja-keyboard-live', url: 'https://ninja-keyboard-nine.vercel.app' },
  { id: 'gamespark', url: 'https://gamespark-ai-kids.vercel.app' },
  { id: 'pdf-empire', url: 'https://pdf-empire-storefront.vercel.app' },
  { id: 'org-brain', url: 'https://org-brain-demo.vercel.app' },
  { id: 'pollr', url: 'https://pollr.co.il' },
  { id: 'eladscore', url: 'https://eladscore.com' },
  { id: 'mens-circle', url: 'https://circle.eladjak.com' },
  { id: 'hitechkids', url: 'https://hitechkids.eladjak.com' },
  { id: 'date-kirva', url: 'https://date-kirva.vercel.app' },
];

async function captureScreenshot(browser, project) {
  const page = await browser.newPage();
  try {
    await page.setViewportSize({ width: 1280, height: 800 });
    console.log(`Capturing ${project.id} from ${project.url}...`);
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500);
    const outputPath = join(outputDir, `${project.id}.png`);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`  OK Saved ${project.id}.png`);
    return { id: project.id, success: true };
  } catch (error) {
    console.error(`  FAIL ${project.id}: ${error.message}`);
    return { id: project.id, success: false, error: error.message };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const batchSize = 3;
  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((p) => captureScreenshot(browser, p)));
    results.push(...batchResults);
  }
  await browser.close();
  console.log('\n--- Results ---');
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  console.log(`OK Succeeded: ${succeeded.length}/${results.length}`);
  if (failed.length > 0) {
    console.log(`FAIL: ${failed.map((f) => `${f.id} (${f.error})`).join(', ')}`);
  }
}

main().catch(console.error);
