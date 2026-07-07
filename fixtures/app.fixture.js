const base = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const LoginPage = require('../pages/login.page');
const DashboardPage = require('../pages/dashboard.page');
const AgentPage = require('../pages/agent.page');
const CommissionPackagePage = require('../pages/commissionPackage.page');
const AwardPage = require('../pages/award.page');

const logger = require('../utils/logger');
const { getEnvConfig, getUsers, getPackageData } = require('../utils/configReader');

function sanitizeFileName(name) {
  return name.replace(/[<>:"/\\|?*]+/g, '_').replace(/\s+/g, '_');
}

exports.test = base.test.extend({
  envConfig: async ({}, use) => {
    await use(getEnvConfig());
  },

  users: async ({}, use) => {
    await use(getUsers());
  },

  packageData: async ({}, use) => {
    await use(getPackageData());
  },

  logger: async ({}, use) => {
    await use(logger);
  },

  page: async ({ page }, use, testInfo) => {
    logger.info(`Starting test: ${testInfo.title}`);
    await use(page);

    if (testInfo.status !== testInfo.expectedStatus) {
      const folderPath = path.join(process.cwd(), 'reports', 'failure-screenshots');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const screenshotPath = path.join(
        folderPath,
        `${sanitizeFileName(testInfo.title)}.png`
      );

      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach('failure-screenshot', {
        path: screenshotPath,
        contentType: 'image/png'
      });

      logger.error(`Test failed: ${testInfo.title}`);
      logger.error(`Failure screenshot saved: ${screenshotPath}`);
    } else {
      logger.info(`Test passed: ${testInfo.title}`);
    }
  },

  loginPage: async ({ page,envConfig }, use) => {
    await use(new LoginPage(page,envConfig));
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
  }
});

exports.expect = base.expect;