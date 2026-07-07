const awardLocators = require('./locators/award.locator');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');

class AwardPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToAwardTab() {
    logger.info('Navigating to Award tab');
    await WaitUtil.clickWhenVisible(awardLocators.awardTab(this.page));
  }

  async selectNoVariation() {
    logger.info('Selecting No variation');
    await WaitUtil.clickWhenVisible(awardLocators.noOption(this.page));
  }

  async save() {
    logger.info('Saving Award page');
    await WaitUtil.clickWhenVisible(awardLocators.saveButton(this.page));
  }
}

module.exports = AwardPage;