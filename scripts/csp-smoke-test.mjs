// CSP smoke test: navigate to high-risk routes and report any console errors,
// CSP violations, or page errors. Used to verify the nonce migration didn't
// break runtime behavior. Runs against the local prod server (npm run start).
//
// Exit code: 0 if all pages clean, 1 if any CSP violation or page error.
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const ROUTES = [
  '/',
  '/about/',
  '/services/',
  '/projects/',
  '/blog/',
  '/contact/',
  '/guide/',
  '/skills-universe/',
  '/methodology/',
  '/claude-code/',
  '/guide/kami/',
  '/en/methodology/',
];

const browser = await chromium.launch();
const context = await browser.newContext();
let totalViolations = 0;
let totalPageErrors = 0;
const report = [];

for (const route of ROUTES) {
  const page = await context.newPage();
  const violations = [];
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(err.message));

  // CSP violations are emitted as the standard SecurityPolicyViolationEvent
  // on the document. Capture them by listening to that event from inside the
  // page after document is ready.
  await page.addInitScript(() => {
    window.__cspViolations__ = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__cspViolations__.push({
        directive: e.violatedDirective,
        blockedURI: e.blockedURI,
        sourceFile: e.sourceFile,
        lineNumber: e.lineNumber,
      });
    });
  });

  let status = 0;
  try {
    const resp = await page.goto(`${BASE}${route}`, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });
    status = resp?.status() ?? 0;
    // Give framer-motion / hydration a beat to settle.
    await page.waitForTimeout(500);
    violations.push(...(await page.evaluate(() => window.__cspViolations__ || [])));
  } catch (err) {
    pageErrors.push(`navigation: ${err.message}`);
  }

  totalViolations += violations.length;
  totalPageErrors += pageErrors.length;
  report.push({ route, status, violations, consoleErrors, pageErrors });
  await page.close();
}

await browser.close();

for (const r of report) {
  const tag = r.violations.length || r.pageErrors.length ? 'FAIL' : 'OK  ';
  console.log(`[${tag}] ${r.route} → ${r.status}`);
  for (const v of r.violations)
    console.log(`       CSP violation: ${v.directive} blocked ${v.blockedURI} @ ${v.sourceFile}:${v.lineNumber}`);
  for (const e of r.pageErrors) console.log(`       page error: ${e}`);
  for (const e of r.consoleErrors) console.log(`       console error: ${e}`);
}

console.log('');
console.log(`Total CSP violations: ${totalViolations}`);
console.log(`Total page errors:    ${totalPageErrors}`);

process.exit(totalViolations + totalPageErrors > 0 ? 1 : 0);
