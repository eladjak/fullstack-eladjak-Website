import { defineConfig } from '@playwright/test';

// Deliberately separate from the existing config whose baseURL is production.
export default defineConfig({
  testDir: './tests/guide-discovery',
  timeout: 90000,
  expect: { timeout: 30000 },
  workers: 1,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4381',
    browserName: 'chromium',
    channel: 'chrome',
    locale: 'he-IL',
    screenshot: 'only-on-failure',
  },
  outputDir: 'test-results/guides-local',
  reporter: 'line',
});
