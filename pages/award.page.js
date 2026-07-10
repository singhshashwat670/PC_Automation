const awardLocators = require('./locators/award.locator');
const WaitUtil = require('../utils/waitUtil');
const { expect } = require('@playwright/test');
const logger = require('../utils/logger');

class AwardPage {
  constructor(page) {
    this.page = page;
  }

  
async navigateToAwardTab() {
    logger.info('Navigating to Award tab');
    await WaitUtil.click(awardLocators.awardTab(this.page));
  }

  async selectYesForVariationOption() {
  logger.info('Selecting Yes radio button');
  await expect(awardLocators.noOption(this.page)).toBeChecked();
  const YesOption = awardLocators.YesOption(this.page);
  await YesOption.check();
  await expect(YesOption).toBeChecked();
}  
  async awardgroup(groupname){
          await WaitUtil.click(awardLocators.awardgroup(this.page));
           await expect(
        awardLocators.modalTitle(this.page)
    ).toContainText('Add awards group');
    const gname = awardLocators.groupname(this.page);
   await gname.fill(groupname);
   const awardselect = awardLocators.awardselect(this.page);
   await awardselect.check({ force: true });
   await expect(awardselect).toBeChecked();
    await awardLocators.crvary(this.page).check({ force: true });
    await awardLocators.doneButton(this.page).click();
  }

  async clickawardarrowButton(groupname) {
 
  logger.info(
      'Clicking arrow button for award group: ${groupname}'
    );

    const arrow = awardLocators.awardarrowButton(this.page,groupname);

    await expect(arrow).toBeVisible();

    await arrow.click();
}
  

  async selectNoVariation() {
    logger.info('Selecting No variation');
    await WaitUtil.click(awardLocators.noOption(this.page));
  }

  async save() {
    logger.info('Saving Award page');
    await WaitUtil.click(awardLocators.SaveButton(this.page));
  }
  async saveaward() {
    logger.info('Saving Award page');
    await WaitUtil.click(awardLocators.SaveawardButton(this.page));
  }

  async selectPercentageFromDropdown() {
  logger.info('Selecting Percentage from dropdown');
   await WaitUtil.click(awardLocators.commissionTypeDropdown(this.page));
   await WaitUtil.click(awardLocators.percentageOption(this.page));
  //expect(awardLocators.percentageOption(this.page)).toBeVisible();
} 

async enterpercentagevalue(commissionPercentage) {

    logger.info('Entering Percentage value');
    await awardLocators.percentageinput(this.page).clear();
    await awardLocators.percentageinput(this.page).fill(commissionPercentage.toString());
}

/*async selectCommissionRateType() {
    logger.info('Selecting Commission Rate Type');

    const crdropdown = awardLocators.crdropdown(this.page);
    await WaitUtil.click(awardLocators.crdropdown(this.page));
    await WaitUtil.click(awardLocators.crdropdown(this.page).selectOption('38'));
    await expect(awardLocators.crdropdown(this.page)).toHaveValue('38');
}

    */
   async selectCommissionRateTypeAsYears() {

  logger.info('Verifying Full course fee is selected');

  const selectedText = awardLocators.rateTypeSelectedText(this.page);
  await expect(selectedText).toBeVisible({timeout: 15000});
  await expect(selectedText).toHaveText('Full course fee');
  logger.info('Opening Commission Rate Type dropdown');
  await awardLocators.rateTypeDropdown(this.page).click();
  logger.info('Selecting Year(s) option');
  await expect(awardLocators.yearOption(this.page)).toBeVisible({timeout: 10000});
  await awardLocators.yearOption(this.page).click();
  await expect( awardLocators.rateTypeSelectedText(this.page) ).toHaveText('Year(s)');
  await expect(awardLocators.rateTypeHiddenSelect(this.page)).toHaveValue('38');
}

async commissionrateduration(year) {
    logger.info('Entering Commission Rate Duration');
    await awardLocators.yearInput(this.page).clear();
    await awardLocators.yearInput(this.page).fill(year.toString());
}
async gobackbutton() {
    logger.info('Go Back to previous page');
    await WaitUtil.click(awardLocators.gobackButton(this.page));
  }

  async closeSuccessPopup() {
    await expect(awardLocators.successMessage(this.page)).toContainText('Data saved successfully');

    await WaitUtil.click( awardLocators.closePopupButton(this.page));
    await expect(awardLocators.closePopupButton(this.page)).toBeHidden();
}


}

module.exports = AwardPage;