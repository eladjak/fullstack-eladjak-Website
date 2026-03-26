import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'public', 'projects');

const sites = [
  { name: 'haderech-screenshot', url: 'https://haderech-next.vercel.app' },
  { name: 'portfolio-screenshot', url: 'https://fullstack-eladjak.co.il' },
  { name: 'ey-ai-kids-screenshot', url: 'https://www.sipurai.ai' },
  { name: 'omanut-screenshot', url: 'https://omanut-hakesher-website.vercel.app' },
  { name: 'bayit-beseder-screenshot', url: 'https://www.bayitbeseder.com' },
  { name: 'html-to-pptx-screenshot', url: 'https://html-to-pptx-ten.vercel.app' },
  { name: 'hebrew-calendar-screenshot', url: 'https://hebrew-calendar-eosin.vercel.app' },
  { name: 'vacation-vibe-screenshot', url: 'https://vacation-vibe-pi.vercel.app' },
  { name: 'team-meetings-screenshot', url: 'https://team-meetings.vercel.app' },
  { name: 'customer-crm-screenshot', url: 'https://customer-crm-tau.vercel.app' },
];

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  for (const site of sites) {
    const page = await context.newPage();
    try {
      console.log(`📸 Capturing ${site.name} from ${site.url}...`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait a bit for animations/lazy images
      await page.waitForTimeout(2000);
      const path = join(outputDir, `${site.name}.png`);
      await page.screenshot({ path, type: 'png', fullPage: false });
      console.log(`  ✅ Saved: ${path}`);
    } catch (err) {
      console.error(`  ❌ Failed ${site.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎉 Done! All screenshots saved to public/projects/');
}

takeScreenshots();
