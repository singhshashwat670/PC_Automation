// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: 'tests',
 // retries :1,

 /* ✅ Global timeout for each test */
  timeout: 40000, // 40 seconds

  /* ✅ Expect timeout  */
  expect: {
    timeout: 10000 // 10 seconds
  },


  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* 'open: never' — auto-opening a live report server on every failed run
     leaves a process bound to port 9323, which collides (EADDRINUSE) if the
     previous run's server is still alive when the next run starts. View
     results on demand instead via `npm run report`. */
  reporter: [['html', { open: 'never', outputFolder: 'reports/html' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* ✅ Per-action timeout, independent of the global test timeout.
       Without this, a stuck click/fill retries against the full 40s test
       timeout, which masks the real actionability error ("not stable",
       "not visible", etc.) behind a generic "Test timeout exceeded". */
    actionTimeout: 15000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
    /* --force-device-scale-factor=1 neutralizes Windows display scaling
       (125%/150% etc.), which otherwise makes Chromium render as if zoomed
       and confuses Playwright's viewport/scroll actionability checks. */
    args: ['--start-maximized', '--force-device-scale-factor=1', '--high-dpi-support=1']
    },
 viewport: null
 },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',


      //use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

/*
const { defineConfig, devices } = require('@playwright/test');
const { getEnvConfig } = require('./utils/configReader');

const envConfig = getEnvConfig();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  expect: {
    timeout: 15 * 1000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/results.xml' }]
  ],
  use: {
    baseURL: envConfig.baseURL,
    browserName: 'chromium',
    headless: true,
    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: { width: 1536, height: 864 }
  },
  outputDir: 'reports/artifacts',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
*/
