const agentLocators = require('./locators/agent.locator');
const { expect } = require('@playwright/test');
const WaitUtil = require('../utils/waitUtil');
const DateUtil = require('../utils/dateUtil');
const logger = require('../utils/logger');

class AgentPage {
  constructor(page) {
    this.page = page;
  }
  
async navigateToAgentTab() {

    const agents =
        agentLocators.agentTab(this.page);

    await agents.waitFor({
        state: 'visible'
    });

    await agents.hover();
    await agents.click();
}
async navigate_AgentTab() {
   logger.info('Navigate Agent Tab');
    await WaitUtil.click(agentLocators.agent_Tab(this.page));
}

  async openAgentsDropdown() {
    logger.info('Opening Agents dropdown');
    await WaitUtil.click(agentLocators.agentsDropdown(this.page));
  }

  async selectEasyCommission() {
    logger.info('Selecting Easy Commission');
    await WaitUtil.click(agentLocators.easyCommissionOption(this.page));
  }

  async clickSettings() {
    logger.info('Clicking Settings');
    await WaitUtil.waitForPageLoad(this.page);
    await WaitUtil.click(agentLocators.settingsButton(this.page));
    //await WaitUtil.waitForPageLoad(this.page);
  }

  async clickFilter() {
    logger.info('Clicking Filter');
     await WaitUtil.click(agentLocators.filterButton(this.page));
     await expect(agentLocators.filterButton(this.page)).toHaveText('Filter');
  }

  async selectAllocationAllocateAnotherPackage() {
    logger.info('Selecting Allocation = Allocate Another Package');
    const selectedallocationText = agentLocators.allocationSelectedText(this.page);
    await expect(selectedallocationText).toBeVisible({timeout: 15000});
    await expect(selectedallocationText).toHaveText('Not Allocated to any package');
    await agentLocators.allocationDropdown(this.page).click();
    await expect(agentLocators.allocatepackageoption(this.page)).toBeVisible({timeout: 10000});
    await agentLocators.allocatepackageoption(this.page).click();
    await expect( agentLocators.allocationSelectedText(this.page)).toHaveText('Allocated another package');
  //await expect(awardLocators.rateTypeHiddenSelect(this.page)).toHaveValue('38');
   
  }

  async clickDone() {
    logger.info('Clicking Done');
    await WaitUtil.click(agentLocators.doneButton(this.page));
  }

  async searchAgent(agentName) {
    logger.info(`Searching agent: ${agentName}`);
    await WaitUtil.fill(agentLocators.searchInput(this.page), agentName);
  }

  async selectAgent(agentName) {
    logger.info(`Selecting agent: ${agentName}`);
    //await agentLocators.agentselect(this.page, agentName);
    await agentLocators.agentselect(this.page, agentName).click();
  }

  async clickAllocatePackage() {
    logger.info('Clicking Allocate Package');
    await WaitUtil.click(agentLocators.allocatePackageButton(this.page));
  }

  async selectCurrentDate() {
    logger.info('Selecting current date');
     const DateField = agentLocators.DateField(this.page);
    await DateUtil.selectCurrentDate(DateField);
    
  }

  async closePopup() {
    logger.info('Closing popup');
    await WaitUtil.click(agentLocators.closePopupButton(this.page));
  }

  async scrollToTop() {
    logger.info('Scrolling to top');
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickActive() {
    logger.info('Clicking Active');
    await WaitUtil.click(agentLocators.activeToggle(this.page));
  }

  async selectYes() {
    logger.info('Selecting Yes');
    await WaitUtil.click(agentLocators.yesOption(this.page));
  }

  async goBack() {
    logger.info('Clicking Back');
    await WaitUtil.waitForPageLoad(this.page);
    await WaitUtil.click(agentLocators.backButton(this.page));
    //await WaitUtil.waitForPageLoad(this.page);
  }

  async openAgentFramework(agentName) {
    logger.info(`Opening agent framework for: ${agentName}`);
    await this.searchAgent(agentName);
    await this.page.getByText(new RegExp(agentName, 'i')).first().click();
  }
}

module.exports = AgentPage;
