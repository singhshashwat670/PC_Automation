const { test, expect } = require('../fixtures/app.fixture');

test.describe('Agents > Training - Manage Training Workflow', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, users, logger }) => {
    logger.info('===== Manage Training Test Execution Started =====');
    await loginPage.navigateToLogin();
    await loginPage.login(users.trainingAdminUser.username, users.trainingAdminUser.password);
    await dashboardPage.validateDashboardLoaded();
  });

  test.afterEach(async ({ logger }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
      logger.info('===== Manage Training Test Execution Completed Successfully =====');
    }
  });

  test('Create a new training program successfully', async ({ trainingPage, trainingData }) => {
    // Each run needs a unique name so re-runs don't collide with a previously created program.
    const programData = {
      ...trainingData.program,
      name: `${trainingData.program.namePrefix} ${Date.now()}`,
      startDate: new Date().toISOString().slice(0, 10)
    };

    await trainingPage.navigateToManageTraining();
    await trainingPage.validateManageTrainingPageLoaded();

    await trainingPage.clickAddProgram();
    await expect(trainingPage.page.locator('#headingAddProgream')).toHaveText('Add Program');

    await trainingPage.fillAddProgramForm(programData);
    await trainingPage.saveProgram();

    await trainingPage.searchProgram(programData.name);
    await trainingPage.validateProgramCreated(programData.name);
  });
});
