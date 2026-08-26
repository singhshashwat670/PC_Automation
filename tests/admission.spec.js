const { test, expect } = require('../fixtures/app.fixture');
const WaitUtil = require('../utils/waitUtil');

test.describe('Admissions Module Workflow', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, users, logger }) => {
    test.setTimeout(90000);
    logger.info('===== Admissions Test Execution Started =====');
    await loginPage.navigateToLogin();
    await loginPage.login(users.assessorUser.username, users.assessorUser.password);
    await dashboardPage.validateDashboardLoaded();
  });

  test.afterEach(async ({ logger }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
      logger.info('===== Admissions Test Execution Completed Successfully =====');
    }
  });

  test('Create student and validate via search successfully', async ({
    admissionPage,
    studentData
  }) => {
    const studentEmail = `${studentData.studentEmailPrefix}.${Date.now()}@yopmail.com`;

    await admissionPage.navigateToAdmissionsModule();
    await admissionPage.validateAdmissionsPageLoaded();

    await admissionPage.clickNewStudent();
    await admissionPage.createStudent(studentData, studentEmail);
    await admissionPage.clickDone();
    
    await admissionPage.validateCreatedStudentProfile(studentData.givenName);
    await admissionPage.navigateBack();
  
   // await admissionPage.navigateToAdmissionsModule();
    await admissionPage.validateAdmissionsPageLoaded();

    await admissionPage.searchStudent(studentEmail);
    await admissionPage.validateSearchResult(studentData.givenName, studentEmail);
  });
});
