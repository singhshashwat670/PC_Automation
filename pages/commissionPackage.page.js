const commissionPackageLocators = require('./locators/commissionPackage.locator');
const { expect } = require('@playwright/test');
const WaitUtil = require('../utils/waitUtil');
const DateUtil = require('../utils/dateUtil');
const logger = require('../utils/logger');


class CommissionPackagePage {
  constructor(page) {
    this.page = page;
  }

  async clickManagePackages() {
    logger.info('Clicking Manage Packages');
    
    await WaitUtil.click(commissionPackageLocators.managePackagesButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }


  async validateCommissionPackagesPage() {
    logger.info('Validating Commission Packages Page');
    await WaitUtil.waitForVisible(commissionPackageLocators.commissionPackagesPageTitle(this.page));
  }

  async clickAddPackage() {
    logger.info('Clicking Add Package');
    await WaitUtil.click(commissionPackageLocators.addPackageButton(this.page));
  }

  async enterPackageName(packageName) {
    logger.info(`Entering package name: ${packageName}`);
    await WaitUtil.fill(commissionPackageLocators.packageNameInput(this.page), packageName);
  }

  async enterDescription(description) {
    logger.info(`Entering description: ${description}`);
    await WaitUtil.fill(commissionPackageLocators.descriptionInput(this.page), description);
  }

  async selectCurrentDate() {
    logger.info('Selecting current date from calendar');
   //await WaitUtil.click(commissionPackageLocators.dateField(this.page));
   //await DateUtil.selectCurrentDate(this.page);
   
const dateField = commissionPackageLocators.dateField(this.page);

await DateUtil.selectCurrentDate(dateField);
  }

  async clickDone() {
    logger.info('Clicking Done');
    await WaitUtil.click(commissionPackageLocators.doneButton(this.page));
  }

  /*async searchPackage(packageName) {
    logger.info(`Searching package: ${packageName}`);
    await WaitUtil.fill(commissionPackageLocators.searchInput(this.page), packageName);
    await commissionPackageLocators.searchInput(this.page).press('Enter');
    await this.page.waitForTimeout(5000);
   // await this.page.press('Enter');
    //await WaitUtil.waitForVisible(commissionPackageLocators.searchResultByPackageName(this.page, packageName));
  }
    */

  
async searchPackage(packageName) {
const searchBox = commissionPackageLocators.searchInput(this.page);
await searchBox.fill(packageName);
await searchBox.click();
await searchBox.press('Enter');
}
  async openSearchedPackage(packageName) {
    logger.info(`Opening package: ${packageName}`);

    const packageResult =
        commissionPackageLocators.searchResultByPackageName(
            this.page,
            packageName
        );

    await expect(packageResult).toBeVisible({
        timeout: 12000
    });

    await expect(packageResult).toContainText(packageName);
    await packageResult.click();
}
  /*async clickArrowButton() {
    await expect(
        this.page.locator('#tblCommPackages tbody tr').first()
    ).toBeVisible();
  }
    */
async clickArrowButton() {
    logger.info('Clicking Arrow button');
    await WaitUtil.click(commissionPackageLocators.arrowButton(this.page));
  }

  async uncheckCourses() {
    logger.info('Unchecking Courses');
    
  const coursesCheckbox = commissionPackageLocators.coursesCheckbox(this.page);
  if (await coursesCheckbox.isChecked()) {
    await coursesCheckbox.uncheck();
  }
  await expect(coursesCheckbox).not.toBeChecked();
  }

  async uncheckNonAwardCourses() {
    logger.info('Unchecking Non Award Courses');
    const nonAwardCoursesCheckbox = commissionPackageLocators.nonAwardCoursesCheckbox(this.page);
    if (await nonAwardCoursesCheckbox.isChecked()) {
    await nonAwardCoursesCheckbox.uncheck();
  }
    await expect(nonAwardCoursesCheckbox).not.toBeChecked();
   // await WaitUtil.click(commissionPackageLocators.nonAwardCoursesCheckbox(this.page));
  }

  async uncheckPackagedAwards() {
    logger.info('Unchecking Packaged Awards');
    const packagedAwardsCheckbox = commissionPackageLocators.packagedAwardsCheckbox(this.page);
    if (await packagedAwardsCheckbox.isChecked()) {
    await packagedAwardsCheckbox.uncheck();
  }
    await expect(packagedAwardsCheckbox).not.toBeChecked();
}

   /* async checkUnitSection() {
const unitsection = commissionPackageLocators.unitsection(this.page);
if (await unitsection.isUnchecked()) {
    await unitsection.check();
  }

await expect(this.page.getByLabel('No')).toBeChecked();
await expect(this.page.getByLabel('Yes')).not.toBeChecked();
    }
*/

async checkUnitSection() {
  logger.info('Selecting No radio button');

  const unitsection = commissionPackageLocators.unitsection(this.page);
  await unitsection.check();
  await expect(unitsection).toBeChecked();
}  
    //await WaitUtil.click(commissionPackageLocators.packagedAwardsCheckbox(this.page));
  

  /*async selectVisaVariationYes() {
    logger.info('Selecting Yes for visa variation');
    await WaitUtil.click(commissionPackageLocators.visaTypeVariationYes(this.page));
  }
    */

  async save() {
    logger.info('Saving changes');
    await WaitUtil.click(commissionPackageLocators.saveButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
    await this.closeSuccessPopup();
  }

async closeSuccessPopup() {

    await expect(
        commissionPackageLocators.successMessage(this.page)
    ).toContainText('Data saved successfully');

    await WaitUtil.click(
        commissionPackageLocators.closePopupButton(this.page)
    );

    await expect(
       commissionPackageLocators.closePopupButton(this.page)
    ).toBeHidden();
}

  async navigateToAwardTab() {
    logger.info('Navigating to Award tab');
    await WaitUtil.click(commissionPackageLocators.awardTab(this.page));
  }

  async selectYesForVariationOption() {
  logger.info('Selecting Yes radio button');

  const YesOption = commissionPackageLocators.YesOption(this.page);
  await YesOption.check();
  await expect(YesOption).toBeChecked();
}  
  

  async selectPercentageFromDropdown() {
    logger.info('Selecting Percentage from dropdown');
    await WaitUtil.click(commissionPackageLocators.commissionTypeDropdown(this.page));
    await WaitUtil.click(commissionPackageLocators.percentageOption(this.page));
  }

  async enterPercentage(value) {
    logger.info(`Entering percentage value: ${value}`);
    await WaitUtil.fill(commissionPackageLocators.commissionValueInput(this.page), value.toString());
  }

  async enterYear(year) {
    logger.info(`Entering year: ${year}`);
    await WaitUtil.fill(commissionPackageLocators.yearInput(this.page), year.toString());
  }

  async closePopup() {
    logger.info('Closing popup');
    await WaitUtil.click(commissionPackageLocators.closePopupButton(this.page));
  }

  async goBack() {
    logger.info('Going back');
    await WaitUtil.click(commissionPackageLocators.backButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }
}

module.exports = CommissionPackagePage;