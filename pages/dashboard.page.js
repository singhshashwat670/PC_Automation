const dashboardLocators = require('./locators/dashboard.locator');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async validateDashboardLoaded() {
    logger.info('Validating dashboard');
    await WaitUtil.waitForVisible(dashboardLocators.dashboardHeader(this.page));
  }
}

module.exports = DashboardPage;