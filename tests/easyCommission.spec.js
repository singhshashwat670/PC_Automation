const { test, expect } = require('../fixtures/app.fixture');
const { nextButton } = require('../pages/locators/login.locator');

test.describe('Easy Commission Workflow', () => {
  test('Create and allocate commission package successfully', async ({
    loginPage,
    dashboardPage,
    agentPage,
    commissionPackagePage,
    users,
    packageData,
    logger
  }) => {
    logger.info('===== Test Execution Started =====');

    await loginPage.navigateToLogin();
    await loginPage.login(
      users.assessorUser.username,
      //nextButton,
      users.assessorUser.password,
      //nextButton
    );

    await dashboardPage.validateDashboardLoaded();
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
    await commissionPackagePage.navigateToAwardTab();
    await commissionPackagePage.selectYesForVariationOption();

    
    await commissionPackagePage.save();

    // Step 25: Select Percentage from Dropdown
    await commissionPackagePage.selectPercentageFromDropdown();

    // Step 26: Enter 37
    await commissionPackagePage.enterPercentage(packageData.commissionPercentage);

    // Step 27: Enter Year 1
    await commissionPackagePage.enterYear(packageData.year);

    // Step 28: Save
    await commissionPackagePage.save();

    // Step 29: Close Popup
    await commissionPackagePage.closePopup();

    // Step 30: Go Back
    await commissionPackagePage.goBack();

    // Step 31: Navigate to Agent Tab
    await agentPage.navigateToAgentTab();

    // Step 32: Click Filter
    await agentPage.clickFilter();

    // Step 33: Allocation = Allocate Another Package
    await agentPage.selectAllocationAllocateAnotherPackage();

    // Step 34: Click Done
    await agentPage.clickDone();

    // Step 35: Select "4Nation Group Australia Pty Ltd"
    await agentPage.selectAgent(packageData.agentName);

    // Step 36: Click Allocate Package
    await agentPage.clickAllocatePackage();

    // Step 37: Select Current Date
    await agentPage.selectCurrentDate();

    // Step 38: Click Done
    await agentPage.clickDone();

    // Step 39: Close Popup
    await agentPage.closePopup();

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

    logger.info('===== Test Execution Completed Successfully =====');
  });
});