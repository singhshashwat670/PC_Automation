const { test, expect } = require('../fixtures/app.fixture');
const AwardPage = require('../pages/award.page');
const { nextButton } = require('../pages/locators/login.locator');

test.describe('Easy Commission Workflow', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, users, logger }) => {
    logger.info('===== Test Execution Started =====');

    await loginPage.navigateToLogin();
    await loginPage.login(
      users.assessorUser.username,
      //nextButton,
      users.assessorUser.password,
      //nextButton
    );

    await dashboardPage.validateDashboardLoaded();
  });

  test.afterEach(async ({ logger }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
      logger.info('===== Test Execution Completed Successfully =====');
    }
  });

  test('Create and allocate commission package successfully', async ({
    agentPage,
    commissionPackagePage,
    awardPage,
    packageData
  }) => {
    await agentPage.navigateToAgentTab();
    await agentPage.openAgentsDropdown();
    await agentPage.selectEasyCommission();
    await agentPage.clickSettings();
    await commissionPackagePage.clickManagePackages();
    await commissionPackagePage.validateCommissionPackagesPage();
   /* await expect(
      commissionPackagePage.page.getByText(/commission packages/i)
    ).toBeVisible();*/
    await expect(commissionPackagePage.page.locator('#dvHeaderText')).toBeVisible();
   await commissionPackagePage.clickAddPackage();
    await commissionPackagePage.enterPackageName(packageData.packageName);
    await commissionPackagePage.enterDescription(packageData.description);
    await commissionPackagePage.selectCurrentDate();
    await commissionPackagePage.clickDone();
    
    
 
    await commissionPackagePage.searchPackage(packageData.packageName);
    //await commissionPackagePage.waitForLoadState();
   //await commissionPackagePage.openFirstResult();
    await commissionPackagePage.openSearchedPackage(packageData.packageName);
    await commissionPackagePage.clickArrowButton(packageData.packageName);
    await expect(commissionPackagePage.page.locator('#dvHeaderText')).toBeVisible();
   await commissionPackagePage.uncheckCourses();
    await commissionPackagePage.uncheckNonAwardCourses();
    await commissionPackagePage.uncheckPackagedAwards();
    //await commissionPackagePage.selectVisaVariationYes();
    await commissionPackagePage.checkUnitSection();
    await commissionPackagePage.save();
    await commissionPackagePage.closeSuccessPopup();

   await awardPage.navigateToAwardTab();
    await awardPage.selectYesForVariationOption();
    await awardPage.save();
    await awardPage.awardgroup(packageData.groupname);
    await awardPage.clickawardarrowButton(packageData.groupname);
    await awardPage.selectPercentageFromDropdown();
    await awardPage.enterpercentagevalue(packageData.commissionPercentage);
    //await awardPage.selectCommissionRateType();
    await awardPage.selectCommissionRateTypeAsYears();
    await awardPage.commissionrateduration(packageData.year);
    await awardPage.saveaward();
    await awardPage.closeSuccessPopup();
    await awardPage.gobackbutton();
    
    

   await agentPage.navigate_AgentTab()
    await agentPage.clickFilter();
    await agentPage.selectAllocationAllocateAnotherPackage();
    await agentPage.clickDone();
    await agentPage.selectAgent(packageData.agentName);
    await agentPage.clickAllocatePackage();
    await agentPage.selectCurrentDate();
    await agentPage.clickDone();
    await agentPage.closePopup();
    
    
    await commissionPackagePage.activatePackage();

    // Step 39: Close Popup
    /*await agentPage.closePopup();

    // Step 40: Scroll to Top
    await agentPage.scrollToTop();

    // Step 41: Click Active
    await agentPage.clickActive();

    // Step 42: Select Yes
    await agentPage.selectYes();

    // Step 43: Go Back
    await agentPage.goBack();

    // Step 44: Search "AT Test"
    await agentPage.searchAgent(packageData.finalAgentSearch);

    // Step 45: Open Agent Framework
    await agentPage.openAgentFramework(packageData.finalAgentSearch);
    */
  });
});