// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory containing the test files
  testDir: 'tests',

  // Maximum time (ms) a single test can run before it is marked as failed
  timeout: 40000, // 40 seconds

  // Maximum time (ms) each expect() assertion can wait before failing
  expect: {
    timeout: 10000 // 10 seconds
  },

  // Run test files in parallel for faster execution
  fullyParallel: true,

  // Fail the build on CI if test.only was accidentally left in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests only on CI (helps with flaky tests in pipelines)
  retries: process.env.CI ? 2 : 0,

  // Limit to a single worker on CI to avoid resource contention; use default locally
  workers: process.env.CI ? 1 : undefined,

  // Generate an HTML report and never auto-open it after a run
  reporter: [['html', { open: 'never', outputFolder: 'reports/html' }]],

  use: {
    // Maximum time (ms) for each action (click, fill, etc.)
    actionTimeout: 15000,

    // Capture a trace only when a test is retried, to help debug failures
    trace: 'on-first-retry',

    // Always capture a screenshot after each test
    screenshot: 'on',

    // Default browser viewport size
    viewport: {
      width: 1920,
      height: 1080
    }
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',

        // Fixed viewport on CI; let the browser use its native window size locally
        viewport: process.env.CI
          ? { width: 1920, height: 1080 }
          : null,

        // Launch maximized locally for easier debugging; use CI defaults on CI
        launchOptions: process.env.CI
          ? {}
          : {
              args: ['--start-maximized']
            }
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ]
});
