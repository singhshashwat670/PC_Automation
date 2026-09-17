const trainingLocators = require('./locators/training.locator');
const { expect } = require('@playwright/test');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');

class TrainingPage {
  constructor(page) {
    this.page = page;
  }

  // ---------- Navigation: Agents > Training > Manage Training ----------

  async navigateToManageTraining() {
    logger.info('Navigating to Agents > Training > Manage Training');
    const agentsTab = trainingLocators.agentsTab(this.page);
    await agentsTab.waitFor({ state: 'visible' });
    await agentsTab.hover();
    await agentsTab.click();

    // The Agents flyout slides open via a CSS animation; clicking the submenu items
    // immediately after they become visible makes their bounding box keep shifting, so
    // Playwright's actionability check never reports "stable". Hovering and giving the
    // animation a moment to finish before clicking avoids that flakiness.
    const trainingMenuItem = trainingLocators.trainingMenuItem(this.page);
    await trainingMenuItem.waitFor({ state: 'visible' });
    await trainingMenuItem.hover();
    await this.page.waitForTimeout(500);
    await WaitUtil.click(trainingMenuItem);

    const manageTrainingMenuItem = trainingLocators.manageTrainingMenuItem(this.page);
    await manageTrainingMenuItem.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await WaitUtil.click(manageTrainingMenuItem);
    await WaitUtil.waitForPageLoad(this.page);
  }

  async validateManageTrainingPageLoaded() {
    logger.info('Validating Manage Training page is loaded');
    await WaitUtil.waitForVisible(trainingLocators.manageTrainingHeading(this.page), 20000);
  }

  // ---------- Add Program modal ----------

  async clickAddProgram() {
    logger.info('Clicking Add Program');
    await WaitUtil.click(trainingLocators.addProgramButton(this.page));
    await WaitUtil.waitForVisible(trainingLocators.addProgramModal(this.page));
  }

  async enterProgramName(programName) {
    logger.info(`Entering program name: ${programName}`);
    await WaitUtil.fill(trainingLocators.programNameInput(this.page), programName);
  }

  async enterProgramDescription(description) {
    logger.info(`Entering program description: ${description}`);
    await WaitUtil.fill(trainingLocators.programDescriptionInput(this.page), description);
  }

  async enterEstimatedTime(minutes) {
    logger.info(`Entering estimated training time: ${minutes} minutes`);
    await WaitUtil.fill(trainingLocators.programEstimatedTimeInput(this.page), String(minutes));
  }

  // Native <input type="date">; start date's min is today, so callers pass an ISO (YYYY-MM-DD) value.
  async enterStartDate(isoDate) {
    logger.info(`Entering program start date: ${isoDate}`);
    await WaitUtil.fill(trainingLocators.programStartDateInput(this.page), isoDate);
  }

  async enterEndDate(isoDate) {
    logger.info(`Entering program end date: ${isoDate}`);
    await WaitUtil.fill(trainingLocators.programEndDateInput(this.page), isoDate);
  }

  // Custom-switch checkboxes render visually hidden behind their styled label, so the
  // input itself needs a forced click rather than relying on normal actionability checks.
  async toggleAllowTopicGroupCreation() {
    logger.info('Toggling "Allow topic group to be created"');
    const checkbox = trainingLocators.allowTopicGroupCheckbox(this.page);
    await checkbox.click({ force: true });
    await expect(checkbox).toBeChecked();
  }

  async toggleAssessmentRequired() {
    logger.info('Toggling "Assessment required"');
    const checkbox = trainingLocators.assessmentRequiredCheckbox(this.page);
    await checkbox.click({ force: true });
    await expect(checkbox).toBeChecked();
  }

  async toggleAllowDownload() {
    logger.info('Toggling "Allow users to download program content"');
    const checkbox = trainingLocators.allowDownloadCheckbox(this.page);
    await checkbox.click({ force: true });
    await expect(checkbox).toBeChecked();
  }

  async fillAddProgramForm(programData) {
    logger.info(`Filling Add Program form: ${JSON.stringify(programData)}`);
    await this.enterProgramName(programData.name);
    if (programData.description) {
      await this.enterProgramDescription(programData.description);
    }
    if (programData.estimatedTimeMinutes) {
      await this.enterEstimatedTime(programData.estimatedTimeMinutes);
    }
    await this.enterStartDate(programData.startDate);
    if (programData.endDate) {
      await this.enterEndDate(programData.endDate);
    }
    if (programData.allowTopicGroupCreation) {
      await this.toggleAllowTopicGroupCreation();
    }
    if (programData.assessmentRequired) {
      await this.toggleAssessmentRequired();
    }
    if (programData.allowDownload) {
      await this.toggleAllowDownload();
    }
  }

  async saveProgram() {
    logger.info('Saving program');
    await WaitUtil.click(trainingLocators.saveProgramButton(this.page));
    await WaitUtil.waitForHidden(trainingLocators.addProgramModal(this.page), 15000);
  }

  // ---------- Search & validation ----------

  async searchProgram(programName) {
    logger.info(`Searching program: ${programName}`);
    await WaitUtil.fill(trainingLocators.programSearchInput(this.page), programName);
    await WaitUtil.click(trainingLocators.searchProgramButton(this.page));
  }

  async validateProgramCreated(programName) {
    logger.info(`Validating program was created: ${programName}`);
    const programRow = trainingLocators.programRowByName(this.page, programName);
    await expect(programRow).toBeVisible({ timeout: 15000 });
    await expect(programRow).toContainText(programName);
  }

  // ---------- Orchestration ----------

 /* async createProgram(programData) {
    await this.clickAddProgram();
    await this.fillAddProgramForm(programData);
    await this.saveProgram();
    await this.searchProgram(programData.name);
    await this.validateProgramCreated(programData.name);
  }
    */
}

module.exports = TrainingPage;
