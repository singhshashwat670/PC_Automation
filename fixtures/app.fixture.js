// Playwright's base test object, extended below with our own fixtures
const base = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Page object classes for each part of the application under test
const LoginPage = require('../pages/login.page');
const DashboardPage = require('../pages/dashboard.page');
const AgentPage = require('../pages/agent.page');
const CommissionPackagePage = require('../pages/commissionPackage.page');
const AwardPage = require('../pages/award.page');
const AdmissionPage = require('../pages/admission.page');
const StudentAddressPage = require('../pages/studentAddress.page');
const TrainingPage = require('../pages/training.page');

// Shared logger and config/test-data readers
const logger = require('../utils/logger');
const { getEnvConfig, getUsers, getPackageData, getStudentData, getTrainingData } = require('../utils/configReader');

function sanitizeFileName(name) {
  return name.replace(/[<>:"/\\|?*]+/g, '_').replace(/\s+/g, '_');
}

exports.test = base.test.extend({
  // Environment config (URLs, credentials source, etc.) for the running test
  envConfig: async ({}, use) => {
    await use(getEnvConfig());
  },

  // Test user accounts loaded from config
  users: async ({}, use) => {
    await use(getUsers());
  },

  // Commission package test data loaded from config
  packageData: async ({}, use) => {
    await use(getPackageData());
  },

  // Student test data loaded from config
  studentData: async ({}, use) => {
    await use(getStudentData());
  },

  // Training program test data loaded from config
  trainingData: async ({}, use) => {
    await use(getTrainingData());
  },

  // Exposes the shared logger instance to tests
  logger: async ({}, use) => {
    await use(logger);
  },

  page: async ({ page }, use, testInfo) => {
    // Log test start before handing the page to the test
    logger.info(`Starting test: ${testInfo.title}`);
    await use(page);

    // After the test runs, compare actual vs expected status to log pass/fail
    const passed = testInfo.status === testInfo.expectedStatus;
    const folderName = passed ? 'passed-screenshots' : 'failure-screenshots';
    const folderPath = path.join(process.cwd(), 'reports', folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const screenshotPath = path.join(
      folderPath,
      `${sanitizeFileName(testInfo.title)}.png`
    );

    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(passed ? 'passed-screenshot' : 'failure-screenshot', {
      path: screenshotPath,
      contentType: 'image/png'
    });

    if (passed) {
      logger.info(`Test passed: ${testInfo.title}`);
      logger.info(`Passed screenshot saved: ${screenshotPath}`);
    } else {
      logger.error(`Test failed: ${testInfo.title}`);
      logger.error(`Failure screenshot saved: ${screenshotPath}`);
    }
  },

  // Below: one fixture per page object, each instantiated with the current page
  // loginPage also depends on envConfig since LoginPage needs the base URL/credentials to navigate and log in
  loginPage: async ({ page, envConfig }, use) => {
    await use(new LoginPage(page, envConfig));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  agentPage: async ({ page }, use) => {
    await use(new AgentPage(page));
  },

  commissionPackagePage: async ({ page }, use) => {
    await use(new CommissionPackagePage(page));
  },

  awardPage: async ({ page }, use) => {
    await use(new AwardPage(page));
  },

  admissionPage: async ({ page }, use) => {
    await use(new AdmissionPage(page));
  },

  studentAddressPage: async ({ page }, use) => {
    await use(new StudentAddressPage(page));
  },

  trainingPage: async ({ page }, use) => {
    await use(new TrainingPage(page));
  }
});

exports.expect = base.expect;
