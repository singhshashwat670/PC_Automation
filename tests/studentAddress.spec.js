const { test, expect } = require('../fixtures/app.fixture');

test.describe('Student Profile - Address Workflow', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, users, logger }) => {
    // addResidentialAddress() now runs the full 11-section chain (Address through Resume)
    // in one continuous test; 90s was sized for a single isolated section and is no longer
    // enough, especially as the shared/persistent test student's data volume grows run over run.
    test.setTimeout(300000);
    logger.info('===== Student Address Test Execution Started =====');
    await loginPage.navigateToLogin();
    await loginPage.login(users.assessorUser.username, users.assessorUser.password);
    await dashboardPage.validateDashboardLoaded();
  });

  test.afterEach(async ({ logger }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
      logger.info('===== Student Address Test Execution Completed Successfully =====');
    }
  });

  test('Add residential address for a student successfully', async ({
    admissionPage,
    studentAddressPage,
    studentData
  }) => {
    // Reusing a student created in a prior run (creation step is disabled above).
    //const studentEmail = 'Divya.1788235311659@yopmail.com';

    // This student is shared/persistent across runs, so a static family name would
    // accumulate duplicate rows on every re-run; suffix it to keep each run's row unique.
    const familyMemberData = { ...studentData.familyMember, familyName: `${studentData.familyMember.familyName}${Date.now()}` };
   const studentEmail = `${studentData.studentEmailPrefix}.${Date.now()}@yopmail.com`;
    await admissionPage.navigateToAdmissionsModule();
    await admissionPage.validateAdmissionsPageLoaded();

    // Create the student to have a known profile to open and fill the address for.
   await admissionPage.clickNewStudent();
    await admissionPage.createStudent(studentData,studentEmail);
    await admissionPage.clickDone();
    await admissionPage.validateCreatedStudentProfile(studentData.givenName);
    await admissionPage.navigateBack();
    

    await admissionPage.validateAdmissionsPageLoaded();
    await admissionPage.searchStudent(studentEmail);
    await admissionPage.validateSearchResult(studentData.givenName, studentEmail);

    // Go inside the student and fill the Address card.
    await studentAddressPage.openStudentFromSearchResults(studentEmail);
    await studentAddressPage.validateProfileTabOpen();
    await studentAddressPage.addResidentialAddress(
      studentData.address,
      studentData.passport,
      studentData.qualifications,studentData.employments,
      `${studentData.givenName} ${studentData.familyName}`,
      studentData.languageAbility,
      familyMemberData,
      studentData.visaHistory,
      studentData.visaApplication,
      studentData.countryVisited,
      studentData.finance,
      studentData.sponsor,
      studentData.oshc,
      studentData.resumeFilePath
    );
  });
});
