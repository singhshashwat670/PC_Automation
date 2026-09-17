const path = require('path');
const { expect } = require('@playwright/test');
const studentAddressLocators = require('./locators/studentAddress.locator');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');


const DUOLINGO_SCORE_FIELDS = {
  speaking: '_duo_speaking',
  writing: '_duo_writing',
  reading: '_duo_reading',
  listening: '_duo_listening',
  production: '_duo_Production',
  literacy: '_duo_Literacy',
  comprehension: '_duo_Comprehension',
  conversation: '_duo_Conversation',
  overall: '_duo_verall',
};

const GRADED_SCORE_FIELDS = {
  listening: '_eng_listening',
  reading: '_eng_reading',
  speaking: '_eng_speaking',
  writing: '_eng_writing',
  overall: '_eng_overall',
};

// Everything but Duolingo shares the one "graded test" modal/id set, so a single DEFAULT
// entry covers IELTS/PTE/TOEFL/OET/CAE/LANGUAGECERT without repeating the same config.
const ENGLISH_TEST_TYPES = {
  DUOLINGO: {
    scoreFields: DUOLINGO_SCORE_FIELDS,
    dateInput: (page) => studentAddressLocators.duolingoTestDateInput(page),
    reportNumberInput: (page) => studentAddressLocators.duolingoReportNumberInput(page),
    scoreInput: (page, fieldId) => studentAddressLocators.duolingoModuleScoreInput(page, fieldId),
    doneButton: (page) => studentAddressLocators.duolingoDoneButton(page),
  },
  DEFAULT: {
    scoreFields: GRADED_SCORE_FIELDS,
    dateInput: (page) => studentAddressLocators.gradedTestDateInput(page),
    reportNumberInput: (page) => studentAddressLocators.gradedTestReportNumberInput(page),
    scoreInput: (page, fieldId) => studentAddressLocators.gradedModuleScoreInput(page, fieldId),
    doneButton: (page) => studentAddressLocators.gradedTestDoneButton(page),
  },
};

class StudentAddressPage {
  constructor(page) {
    this.page = page;
  }

  // ---------- Navigation into the student ----------

  async openStudentFromSearchResults(studentEmail) {
    logger.info(`Opening student profile for: ${studentEmail}`);
    await WaitUtil.click(studentAddressLocators.studentSearchResultLink(this.page, studentEmail));
    await WaitUtil.waitForPageLoad(this.page);
  }

  async validateProfileTabOpen() {
    logger.info('Validating Profile tab is open');
    await WaitUtil.waitForVisible(studentAddressLocators.profileTab(this.page));
   // await WaitUtil.waitForVisible(studentAddressLocators.addressCardHeading(this.page));
  }

  // ---------- My Address card ----------
   // ---------- Add Address modal: form fill ----------

  async validateAddressCardVisible() {
    logger.info('Validating My Address card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.addressCardHeading(this.page));
  }
  /**
   * Opens the My Address section and the "Add Address" modal. The main applicant may
   * already have an address (e.g. a shared/persistent test student) - in that case
   * "add new address" never renders, so the existing row's "Edit" link is used instead;
   * both open the exact same modal.
   */
  async clickAddAddress(studentName) {
    await WaitUtil.click(studentAddressLocators.addAddressButton(this.page));
    logger.info(`Validating student name "${studentName}" is visible`);
    await WaitUtil.waitForVisible(studentAddressLocators.studentNameText(this.page, studentName));

    const editLink = studentAddressLocators.mainApplicantEditAddressLink(this.page);
    if (await editLink.isVisible().catch(() => false)) {
      logger.info('Existing residential address found; opening it via Edit');
      await WaitUtil.click(editLink);
      await WaitUtil.waitForVisible(studentAddressLocators.addAddressModal(this.page));
    } else {
      logger.info('No residential address yet; clicking "add new address"');
      await WaitUtil.clickUntilVisible(
        studentAddressLocators.addnewAddress(this.page),
        studentAddressLocators.addAddressModal(this.page),
        { timeout: 21000, retries: 3 }
      );
    }
  }


  async fillAddressForm(addressData) {
    logger.info(`Filling Add Address form: ${JSON.stringify(addressData)}`);

    await this.selectcountry(addressData.country);
    await this.selectstate(addressData.state);
    await this.citytown(addressData.citySearchText, addressData.city);
    await WaitUtil.fill(studentAddressLocators.residentialAddressLine1Input(this.page), addressData.addressLine1);
    await this.postcode(addressData.postcode);
    await this.addressduration(addressData.durationValue, addressData.durationUnit);
  }
  async selectcountry(country) {
    logger.info(`Selecting country: ${country}`);
    await WaitUtil.click(studentAddressLocators.countrydropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_per_cntry');
    await WaitUtil.fill(searchField, country);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_per_cntry', country).last();
    await WaitUtil.click(option);
  }
   async selectstate(state) {
    logger.info(`Selecting state: ${state}`);
    await WaitUtil.click(studentAddressLocators.statedropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_per_state');
    await WaitUtil.fill(searchField, state);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_per_state', state).first();
    await WaitUtil.click(option);
  }
  async citytown(citySearchText, city) {
    logger.info(`Entering city/town: typing "${citySearchText}" to select "${city}"`);
    const cityInput = studentAddressLocators.cityInput(this.page);
    await WaitUtil.waitForVisible(cityInput);
    await cityInput.click();
    await cityInput.fill('');
    await cityInput.pressSequentially(citySearchText, { delay: 100 });
    const suggestion = studentAddressLocators.citySuggestionOption(this.page, city);
    await suggestion.waitFor({ state: 'visible', timeout: 12000 });
    await suggestion.click();
  }
  async addressline1(addressLine1) {
    logger.info(`Entering address line 1: ${addressLine1}`);
    await WaitUtil.fill(studentAddressLocators.addressLine1Input(this.page), addressLine1);
  }
async postcode(postcode) {
    logger.info(`Entering postcode: ${postcode}`);
    await WaitUtil.fill(studentAddressLocators.postcodeInput(this.page), postcode);
  }
  async addressduration(durationValue, durationUnit) {
    logger.info(`Entering address duration: ${durationValue} ${durationUnit}`);
    await WaitUtil.fill(studentAddressLocators.durationInput(this.page), String(durationValue));
    await WaitUtil.click(studentAddressLocators.durationdropdown(this.page));
    const option = studentAddressLocators.select2Option(this.page, 'ddl_dur_liv_type', durationUnit);
    await WaitUtil.click(option);
  }
 async addressModalDone() {
    logger.info('Clicking Done on Add Address modal');
    await WaitUtil.click(studentAddressLocators.addressDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }
  async validateAddressAdded(addressLine1) {
    logger.info(`Validating residential address was added: ${addressLine1}`);
    const residentialAddress = studentAddressLocators.residentialAddressValue(this.page);
    await expect(residentialAddress).toBeVisible({ timeout: 15000 });
    await expect(residentialAddress).toContainText(addressLine1);
  }
  async navigateBack() {
    // A "saved successfully" toast (#toastrAlt) and/or the jQuery UI overlay can still be
    // fading out right after a Done click and intercept the "Go back" button underneath.
    await this.page.locator('#toastrAlt').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
    await WaitUtil.waitForOverlayToClear(this.page).catch(() => {});
    await WaitUtil.click(studentAddressLocators.navigateBackButton(this.page));
    // The tile grid re-renders via AJAX (not a real navigation), so waitForPageLoad's
    // domcontentloaded check is a no-op here; give the swap time to finish settling.
    await this.page.waitForTimeout(1500);
}

 // ---------- Add Passport modal: form fill ----------
async validatepassportCardVisible() {
    logger.info('Validating passport card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.passportCardHeading(this.page));
  }

  async clickAddpassport(studentName) {
    logger.info(`Validating student name "${studentName}" and "No Passport Added" text are visible`);
     await WaitUtil.click(studentAddressLocators.addpassportButton(this.page));
    logger.info('Clicking "click to add" on My Address card');
    await WaitUtil.waitForVisible(studentAddressLocators.studentNameText(this.page, studentName));
   // await WaitUtil.waitForVisible(studentAddressLocators.noAddressAddedText(this.page));
    await WaitUtil.click(studentAddressLocators.addnewpassport(this.page));
      await WaitUtil.waitForVisible(studentAddressLocators.addpassportModal(this.page));
    
  
  }
  async fillpassportForm(passportData) {
    logger.info(`Filling Passport form: ${JSON.stringify(passportData)}`);
    const modal = studentAddressLocators.addpassportModal(this.page);
   await this.countryofissue(passportData.countryissue);
    await this.passportnumber(passportData.passportNumber);
    await this.issuingauthority(passportData.issuingAuthority);
    await this.dateofissue(passportData.dateofissue);
    await this.dateofexpiry(passportData.dateofexpiry);
  }
  async countryofissue(countryissue) {
    logger.info(`Entering country of issue: ${countryissue}`);
   await WaitUtil.click(studentAddressLocators.countryissuedropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddlpass_cntry');
    await WaitUtil.fill(searchField, countryissue);
    const option = studentAddressLocators.select2Option(this.page, 'ddlpass_cntry', countryissue).last();
    await WaitUtil.click(option);
  }
  async passportnumber(passportNumber) {
    logger.info(`Entering passport number: ${passportNumber}`);
    await WaitUtil.fill(studentAddressLocators.pnoInput(this.page), passportNumber);
  }
  async issuingauthority(issuingAuthority) {
    logger.info(`Entering issuing authority: ${issuingAuthority}`);
    await WaitUtil.fill(studentAddressLocators.issuingAuthorityInput(this.page), issuingAuthority);
  }
  async dateofissue(dateofissue) {
    const isoDate = this.toIsoDate(dateofissue);
    logger.info(`Entering date of issue: ${isoDate}`);
    await WaitUtil.fill(studentAddressLocators.dateofissueInput(this.page), isoDate);
  }
  async dateofexpiry(dateofexpiry) {
    const isoDate = this.toIsoDate(dateofexpiry);
    logger.info(`Entering date of expiry: ${isoDate}`);
    await WaitUtil.fill(studentAddressLocators.dateofexpiryInput(this.page), isoDate);
  }

  // Native <input type="date"> fields only accept strict YYYY-MM-DD; convert DD-MM-YYYY test data before filling.
  toIsoDate(dateValue) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return dateValue;
    }
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateValue);
    if (match) {
      const [, day, month, year] = match;
      return `${year}-${month}-${day}`;
    }
    throw new Error(`Unsupported date format for passport date field: ${dateValue}`);
  }

  async passportModalDone() {
    logger.info('Clicking Done on Add Passport modal');
    await WaitUtil.click(studentAddressLocators.passportDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  // ---------- Add Academic modal: form fill ----------

async validateacademicCardVisible() {
    logger.info('Validating academic card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.academicCardHeading(this.page));
  }

  async clickAddacademic(studentName) {
    logger.info(`Validating student name "${studentName}" and "No Academic Information Added" text are visible`);
     await WaitUtil.click(studentAddressLocators.addacademicButton(this.page));
    logger.info('Clicking "click to add" on My Address card');
    //await WaitUtil.waitForVisible(studentAddressLocators.studentNameText(this.page, studentName));
   // await WaitUtil.waitForVisible(studentAddressLocators.noAddressAddedText(this.page));
    logger.info('Validating "No" is selected for "Do you have any current or previous studies in Australia?"');
    const studyAustraliaNoRadio = studentAddressLocators.studyAustraliaNoRadio(this.page);
    await WaitUtil.waitForVisible(studyAustraliaNoRadio);
    await expect(studyAustraliaNoRadio).toBeChecked();
    logger.info('Clicking "Add qualification"');
    await WaitUtil.click(studentAddressLocators.addQualificationButton(this.page));
    await WaitUtil.waitForVisible( studentAddressLocators.addqualificationModal(this.page));
    
  }

  async fillacademicsForm(academicsData) {
    logger.info(`Filling Academics form: ${JSON.stringify(academicsData)}`);

    const qualifications = Array.isArray(academicsData.qualifications)
      ? academicsData.qualifications
      : [academicsData.qualifications];

    for (const qualification of qualifications) {
      await this.selectQualificationCountry(qualification.country);
      await this.selectQualificationState(qualification.state);
      await this.qualificationCity(qualification.city);
      await this.qualificationName(qualification.qualification);
      await this.selectMediumOfInstruction(qualification.mediumOfInstruction);
      await this.instituteName(qualification.instituteName);
      await this.awardingBody(qualification.awardingBody);
      await this.studyStatus(qualification.studyStatus);
      await this.qualificationDuration(qualification.startDate, qualification.endDate);
      await this.selectScoreType(qualification.scoreType);
      await this.score(qualification.score);
      await this.wasFullTime(qualification.fullTime);
      await this.isHighestQualification(qualification.highestQualification);
     // await this.clickAddQualification();
    }
    
  }

  async selectQualificationCountry(country) {
    logger.info(`Selecting qualification country: ${country}`);
    await WaitUtil.click(studentAddressLocators.qualificationCountryDropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_edu_cntry');
    await WaitUtil.fill(searchField, country);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_edu_cntry', country).last();
    await WaitUtil.click(option);
  }

  async selectQualificationState(state) {
    logger.info(`Selecting qualification state: ${state}`);
    await WaitUtil.click(studentAddressLocators.qualificationStateDropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_edu_state');
    await WaitUtil.fill(searchField, state);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_edu_state', state).first();
    await WaitUtil.click(option);
  }

  async qualificationCity(city) {
    logger.info(`Entering qualification city: ${city}`);
    await WaitUtil.fill(studentAddressLocators.qualificationCityInput(this.page), city);
  }

  async qualificationName(qualification) {
    logger.info(`Entering qualification: ${qualification}`);
    await WaitUtil.fill(studentAddressLocators.qualificationTextInput(this.page), qualification);
  }

  async selectMediumOfInstruction(medium) {
    logger.info(`Selecting medium of instruction: ${medium}`);
    await WaitUtil.click(studentAddressLocators.mediumOfInstructionDropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_medium_inst');
    await WaitUtil.fill(searchField, medium);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_medium_inst', medium).first();
    await WaitUtil.click(option);
  }

  async instituteName(instituteName) {
    logger.info(`Entering institute name: ${instituteName}`);
    await WaitUtil.fill(studentAddressLocators.instituteNameInput(this.page), instituteName);
  }

  async awardingBody(awardingBody) {
    logger.info(`Entering awarding body: ${awardingBody}`);
    await WaitUtil.fill(studentAddressLocators.awardingBodyInput(this.page), awardingBody);
  }
 
  async studyStatus() {
  logger.info(`Selecting study status`);
   const studyStatusRadio = studentAddressLocators.studyStatusRadio(this.page);
  await studyStatusRadio.check();
  await expect(studyStatusRadio).toBeChecked();
}  

  async qualificationDuration(startDate, endDate) {
    const isoStart = this.toIsoDate(startDate);
    const isoEnd = this.toIsoDate(endDate);
    logger.info(`Entering qualification duration: ${isoStart} to ${isoEnd}`);
    await WaitUtil.fill(studentAddressLocators.qualificationStartDateInput(this.page), isoStart);
    await WaitUtil.fill(studentAddressLocators.qualificationEndDateInput(this.page), isoEnd);
  }

  async selectScoreType(scoreType) {
    logger.info(`Selecting score type: ${scoreType}`);
    await WaitUtil.click(studentAddressLocators.scoreTypeDropdown(this.page));
    const option = studentAddressLocators.select2Option(this.page, 'ddl_edu_score_type', scoreType);
    await WaitUtil.click(option);
  }
  async score(score) {
    logger.info(`Entering score: ${score}`);
    await WaitUtil.fill(studentAddressLocators.scoreInput(this.page), String(score));
  }
  async wasFullTime() {
    logger.info(`Selecting "Was this qualification completed full time?"`);
    const fullTimeRadio = studentAddressLocators.fullTimeRadio(this.page);
  await fullTimeRadio.check();
  await expect(fullTimeRadio).toBeChecked();
  }
  async isHighestQualification() {
    logger.info(`Selecting "Is this your highest qualification?"`);
    const highestQualificationRadio = studentAddressLocators.highestQualificationRadio(this.page);
  await highestQualificationRadio.check();
  await expect(highestQualificationRadio).toBeChecked();
  }
 async clickAddQualification() {
    logger.info('Clicking "Add qualification" to save the entry');
    await WaitUtil.click(studentAddressLocators.addQualificationSubmitButton(this.page));
  }
  async qualificationModalDone() {
    logger.info('Clicking Done on Add qualification modal');
    await WaitUtil.click(studentAddressLocators.qualificationModalDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  
  // ---------- Add Employment modal: form fill ----------

async validateemploymentCardVisible() {
    logger.info('Validating employment card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.employmentCardHeading(this.page));
  }
  async clickAddemployment(studentName) {
    logger.info(`Validating student name "${studentName}" and "No employment Added" text are visible`);
     await WaitUtil.click(studentAddressLocators.addemploymentButton(this.page));
    logger.info('Clicking "click to add" on My Employment card');
    //await WaitUtil.waitForVisible(studentAddressLocators.studentNameText(this.page, studentName));
   // await WaitUtil.waitForVisible(studentAddressLocators.noAddressAddedText(this.page));
    logger.info('Validating "Yes" is selected for "Do you have any employment history?"');
    const employmentHistoryYesRadio = studentAddressLocators.employmentHistoryYesRadio(this.page);
    await WaitUtil.waitForVisible(employmentHistoryYesRadio);
    await WaitUtil.click(studentAddressLocators.employmentHistoryYesLabel(this.page));
    await expect(employmentHistoryYesRadio).toBeChecked();
    logger.info('Clicking "Add employment"');
    await WaitUtil.click(studentAddressLocators.addEmploymentButton(this.page));
    await WaitUtil.waitForVisible( studentAddressLocators.addemploymentModal(this.page));
  }

  async fillemploymentForm(employmentData) {
    logger.info(`Filling Academics form: ${JSON.stringify(employmentData)}`);

    const employments = Array.isArray(employmentData.employments)
      ? employmentData.employments
      : [employmentData.employments];

    for (const employment of employments) {
      await this.selectEmploymentStatus(employment.employmentStatus);
      await this.orgname(employment.organizationName);
      await this.industrytype(employment.industryType);

      await this.selectFromSelect2(studentAddressLocators.employmentCountryDropdown(this.page), 'ddlCountry_emp', employment.country, { matchLast: true });
      await this.selectFromSelect2(studentAddressLocators.employmentStateDropdown(this.page), 'ddlState', employment.state);
      await this.selectCityFromAutocomplete(studentAddressLocators.employmentCityInput(this.page), employment.citySearchText, employment.city);
      await this.addressline1(employment.addressLine1);
      await this.contactdetails(employment.contactgivenName, employment.contactmiddleName, employment.contactfamilyName,employment.mobileCountryCode, employment.mobileNumber, employment.position, employment.startDate, employment.endDate);
     // await this.clickAddQualification();
    }
  }

  // contactdetails() above already clicks the modal's Done button per employment entry
  // (SaveEmploymentDetails), so this only settles the AJAX save before navigateBack()
  // fires - waitForPageLoad's domcontentloaded check is a no-op for this in-page swap.
  async employmentModalDone() {
    logger.info('Employment already saved per entry; settling before navigating back');
    await this.page.waitForTimeout(1000);
  }
   async selectEmploymentStatus(employmentStatus) {
    logger.info(`Selecting employment status: ${employmentStatus}`);
    await WaitUtil.click(studentAddressLocators.employmentStatusDropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddlEmploymentStatus');
    await WaitUtil.fill(searchField, employmentStatus);
    const option = studentAddressLocators.select2Option(this.page, 'ddlEmploymentStatus', employmentStatus).first();
    await WaitUtil.click(option);
  }
     async orgname(organizationName) {
    logger.info(`Selecting organization name: ${organizationName}`);
    await WaitUtil.click(studentAddressLocators.orgNameInput(this.page));
    await WaitUtil.fill(studentAddressLocators.orgNameInput(this.page), String(organizationName));
  }
   async industrytype(industryType) {
    logger.info(`Selecting industry type: ${industryType}`);
    await WaitUtil.click(studentAddressLocators.industryTypeDropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddlIndustryType');
    await WaitUtil.fill(searchField, industryType);
    const option = studentAddressLocators.select2Option(this.page, 'ddlIndustryType', industryType);
    await WaitUtil.click(option);
  }
  async selectcountry(country) {
    logger.info(`Selecting country: ${country}`);
    await WaitUtil.click(studentAddressLocators.countrydropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_per_cntry');
    await WaitUtil.fill(searchField, country);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_per_cntry', country).last();
    await WaitUtil.click(option);
  }
   async selectstate(state) {
    logger.info(`Selecting state: ${state}`);
    await WaitUtil.click(studentAddressLocators.statedropdown(this.page));
    const searchField = studentAddressLocators.select2SearchField(this.page, 'ddl_per_state');
    await WaitUtil.fill(searchField, state);
    const option = studentAddressLocators.select2Option(this.page, 'ddl_per_state', state).first();
    await WaitUtil.click(option);
  }
  async citytown(citySearchText, city) {
    logger.info(`Entering city/town: typing "${citySearchText}" to select "${city}"`);
    const cityInput = studentAddressLocators.cityInput(this.page);
    await WaitUtil.waitForVisible(cityInput);
    await cityInput.click();
    await cityInput.fill('');
    await cityInput.pressSequentially(citySearchText, { delay: 100 });
    const suggestion = studentAddressLocators.citySuggestionOption(this.page, city);
    await suggestion.waitFor({ state: 'visible', timeout: 12000 });
    await suggestion.click();
  }
  /*async addressline1(addressLine1) {
    logger.info(`Entering address line 1: ${addressLine1}`);
    await WaitUtil.fill(studentAddressLocators.addressLine1Input(this.page), addressLine1);
  }
*/
  // ---------- Employment modal: Country/State/City/Address Line 1 via one for loop ----------

  async selectFromSelect2(dropdownLocator, selectId, value, { matchLast = false } = {}) {
    await WaitUtil.click(dropdownLocator);
    const searchField = studentAddressLocators.select2SearchField(this.page, selectId);
    await WaitUtil.fill(searchField, value);
    const options = studentAddressLocators.select2Option(this.page, selectId, value);
    await WaitUtil.click(matchLast ? options.last() : options.first());
  }

  async selectCityFromAutocomplete(cityInputLocator, citySearchText, city) {
    await cityInputLocator.click();
    await cityInputLocator.fill('');
    await cityInputLocator.pressSequentially(citySearchText, { delay: 100 });
    await studentAddressLocators.citySuggestionOption(this.page, city).click();
  }

  async fillEmploymentAddress(data) {
    logger.info(`Filling Employment address: ${JSON.stringify(data)}`);
    const fields = [
      { type: 'select2', locator: studentAddressLocators.employmentCountryDropdown(this.page), id: 'ddl_emp_cntry', value: data.country, last: true },
      { type: 'select2', locator: studentAddressLocators.employmentStateDropdown(this.page), id: 'ddl_emp_state', value: data.state },
      { type: 'autocomplete', locator: studentAddressLocators.employmentCityInput(this.page), search: data.citySearchText, value: data.city },
      { type: 'text', locator: studentAddressLocators.employmentAddressLine1Input(this.page), value: data.addressLine1 },
    ];

    for (const f of fields) {
      if (f.type === 'select2') await this.selectFromSelect2(f.locator, f.id, f.value, { matchLast: f.last });
      else if (f.type === 'autocomplete') await this.selectCityFromAutocomplete(f.locator, f.search, f.value);
      else await WaitUtil.fill(f.locator, f.value);
    }
  }

  async contactdetails(contactgivenName,contactmiddleName,contactfamilyName,mobileCountryCode,mobileNumber,position,startDate,endDate) {
    logger.info(`Entering contact details: ${contactgivenName} ${contactmiddleName} ${contactfamilyName}`);
    await WaitUtil.fill(studentAddressLocators.contactGivenNameInput(this.page), contactgivenName);
    await WaitUtil.fill(studentAddressLocators.contactMiddleNameInput(this.page), contactmiddleName);
    await WaitUtil.fill(studentAddressLocators.contactFamilyNameInput(this.page), contactfamilyName);
    await this.selectFromSelect2(studentAddressLocators.mobileCountryDropdown(this.page), 'ddlMobileCountryCodeContact', mobileCountryCode);
    await WaitUtil.fill(studentAddressLocators.mobileNumberInput(this.page), mobileNumber);
    await WaitUtil.fill(studentAddressLocators.positionInput(this.page), position);
    const isoStart = this.toIsoDate(startDate);
    const isoEnd = this.toIsoDate(endDate);
    logger.info(`Entering employment duration: ${isoStart} to ${isoEnd}`);
    await WaitUtil.fill(studentAddressLocators.employmentStartDateInput(this.page), isoStart);
    await WaitUtil.fill(studentAddressLocators.employmentEndDateInput(this.page), isoEnd);
     await WaitUtil.click(studentAddressLocators.employmentDoneButton(this.page));
  }


  // ---------- Language Ability card & Add English Test ----------

  async validateLanguageAbilityCardVisible() {
    logger.info('Validating Language Ability card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.languageAbilityCardHeading(this.page));
  }

  async clickAddLanguageAbility() {
    logger.info('Clicking "Add" on Language Ability card');
    await WaitUtil.click(studentAddressLocators.addlanguageabilityButton(this.page));
    await WaitUtil.waitForVisible(studentAddressLocators.englishAbilityQuestionHeading(this.page));
  }

  // Ability options are independent on/off switches, each keyed by its own input id
  // (e.g. "has_taken_eng_tests") rather than a shared radio-group name. Clicking the
  // label doesn't reliably forward to this custom-switch's checkbox (verified live), so
  // the input itself is clicked directly with force (Bootstrap custom-switch inputs are
  // visually hidden behind the styled label, which fails normal actionability checks).
  async toggleEnglishAbilityOption(toggleId) {
    logger.info(`Toggling English ability option: ${toggleId}`);
    const toggleInput = studentAddressLocators.englishAbilityToggleInput(this.page, toggleId);
    await toggleInput.waitFor({ state: 'attached', timeout: 12000 });
    await toggleInput.click({ force: true });
    await expect(toggleInput).toBeChecked();
  }

  async clickAddEnglishTest() {
    logger.info('Clicking "Add English Test"');
    await WaitUtil.click(studentAddressLocators.addEnglishTestButton(this.page));
  }

  async selectEnglishTestType(testType) {
    logger.info(`Selecting English test type: ${testType}`);
    await WaitUtil.click(studentAddressLocators.addEnglishTestDropdownOption(this.page, testType));
  }

  /**
   * Fills whichever "Add English test" modal is currently open - Duolingo or any graded
   * test (IELTS/PTE/TOEFL/OET/CAE/LANGUAGECERT) - driven by testType via ENGLISH_TEST_TYPES,
   * so one method covers every option in the dropdown instead of one per test type.
   */
  async fillEnglishTestForm(testType, testData) {
    logger.info(`Filling ${testType} English test form: ${JSON.stringify(testData)}`);
    const config = ENGLISH_TEST_TYPES[testType.toUpperCase()] || ENGLISH_TEST_TYPES.DEFAULT;

    await WaitUtil.fill(config.dateInput(this.page), this.toIsoDate(testData.testDate));
    await WaitUtil.fill(config.reportNumberInput(this.page), testData.reportNumber);

    for (const [scoreKey, value] of Object.entries(testData.scores || {})) {
      const fieldId = config.scoreFields[scoreKey];
      if (!fieldId) {
        logger.info(`No field mapped for score "${scoreKey}" on ${testType}; skipping`);
        continue;
      }
      await WaitUtil.fill(config.scoreInput(this.page, fieldId), String(value));
    }

    await WaitUtil.click(config.doneButton(this.page));
  }

  /**
   * End-to-end: validate the card, open it, switch on the relevant ability toggle
   * (defaults to "Student has taken English language test..."), add an English test of
   * the given type, fill its form and save.
   */
  async languageabilityForm(languageAbilityData) {
    await this.validateLanguageAbilityCardVisible();
    await this.clickAddLanguageAbility();
    await this.toggleEnglishAbilityOption(languageAbilityData.toggleId || 'has_taken_eng_tests');
    await this.clickAddEnglishTest();
    await this.selectEnglishTestType(languageAbilityData.testType);
    await this.fillEnglishTestForm(languageAbilityData.testType, languageAbilityData);
  }

  // ---------- Add Family member modal: form fill ----------

  async validateFamilyMembersCardVisible() {
    logger.info('Validating Family members card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.familyMembersCardHeading(this.page));
  }

  /**
   * Opens the "My family members" section from the tile grid, ensures "Do you have
   * family members?" is set to Yes (required before "Add family member" is actionable),
   * then opens the Add family member modal.
   */
  async clickAddFamilyMember() {
    logger.info('Opening Family members section');
    await WaitUtil.click(studentAddressLocators.addfamilymembersButton(this.page));
    const yesRadio = studentAddressLocators.hasFamilyMembersYesRadio(this.page);
    await WaitUtil.waitForVisible(yesRadio);
    if (!(await yesRadio.isChecked())) {
      await WaitUtil.click(studentAddressLocators.hasFamilyMembersYesLabel(this.page));
    }
    logger.info('Clicking "Add family member"');
    await WaitUtil.click(studentAddressLocators.addFamilyMemberButton(this.page));
    await WaitUtil.waitForVisible(studentAddressLocators.addFamilyMemberModal(this.page));
  }

  async fillFamilyMemberForm(familyMemberData) {
    logger.info(`Filling Add family member form: ${JSON.stringify(familyMemberData)}`);

    // [locator, select id, value, matchLast] - driven through the shared select2 helper
    // instead of one method per dropdown, since every field here follows the same pattern.
    const dropdowns = [
      [studentAddressLocators.familyRelationshipDropdown(this.page), 'ddlRelationship_famV2', familyMemberData.relationship, false],
      [studentAddressLocators.familyNationalityDropdown(this.page), 'ddlCountry_famV2', familyMemberData.nationality, true],
      [studentAddressLocators.familyTitleDropdown(this.page), 'ddlTitle_famV2', familyMemberData.title, false],
      [studentAddressLocators.familyGenderDropdown(this.page), 'ddlGender_famV2', familyMemberData.gender, false],
      [studentAddressLocators.familyMaritalStatusDropdown(this.page), 'ddlMaritalStatus_famV2', familyMemberData.maritalStatus, false],
    ];
    for (const [locator, selectId, value, matchLast] of dropdowns) {
      await this.selectFromSelect2(locator, selectId, value, { matchLast });
    }

    await WaitUtil.fill(studentAddressLocators.familyGivenNameInput(this.page), familyMemberData.givenName);
    await WaitUtil.fill(studentAddressLocators.familyMiddleNameInput(this.page), familyMemberData.middleName || '');
    await WaitUtil.fill(studentAddressLocators.familyFamilyNameInput(this.page), familyMemberData.familyName);
    await WaitUtil.fill(studentAddressLocators.familyDobInput(this.page), this.toIsoDate(familyMemberData.dateOfBirth));

    // Date of Marriage only renders when Marital Status is "Married".
    if (familyMemberData.maritalStatus?.toLowerCase() === 'married') {
      await WaitUtil.fill(studentAddressLocators.familyMarriageDateInput(this.page), this.toIsoDate(familyMemberData.dateOfMarriage));
    }

    await WaitUtil.fill(studentAddressLocators.familyEmailInput(this.page), familyMemberData.email);
    await this.selectFromSelect2(studentAddressLocators.familyMobileCountryDropdown(this.page), 'ddlFamMobileCountry', familyMemberData.mobileCountryCode);
    await WaitUtil.fill(studentAddressLocators.familyMobileInput(this.page), familyMemberData.mobileNumber);

    await this.selectFromSelect2(studentAddressLocators.familyCountryDropdown(this.page), 'ddlFamilyCountry', familyMemberData.country, { matchLast: true });
    // State options are fetched via AJAX after country selection; give the request time to populate.
    await this.page.waitForTimeout(1000);
    await this.selectFromSelect2(studentAddressLocators.familyStateDropdown(this.page), 'ddlFamilyState', familyMemberData.state);
    await WaitUtil.fill(studentAddressLocators.familyCityInput(this.page), familyMemberData.city);
    await WaitUtil.fill(studentAddressLocators.familyStreet1Input(this.page), familyMemberData.addressLine1);
    if (familyMemberData.addressLine2) {
      await WaitUtil.fill(studentAddressLocators.familyStreet2Input(this.page), familyMemberData.addressLine2);
    }
    await WaitUtil.fill(studentAddressLocators.familyPostcodeInput(this.page), familyMemberData.postcode);

    if (familyMemberData.travelWithMain) {
      await WaitUtil.click(studentAddressLocators.familyTravelWithMainToggleLabel(this.page));
    }
  }

  async familyMemberModalDone() {
    logger.info('Clicking Done on Add family member modal');
    await WaitUtil.click(studentAddressLocators.familyMemberDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  // .last() guards against strict-mode failures when the student already has other
  // rows matching the same name (e.g. re-running this test against a shared/persistent
  // student) - the newest matching row is the one this run just added.
  async validateFamilyMemberAdded(familyMemberName) {
    logger.info(`Validating family member was added: ${familyMemberName}`);
    await expect(studentAddressLocators.familyMemberRow(this.page, familyMemberName).last()).toBeVisible({ timeout: 15000 });
  }

  /**
   * End-to-end: open the Family members section, add a family member with the given
   * data, save, and confirm the new row appears in the family members table.
   */
  async familymembersForm(familyMemberData) {
    await this.validateFamilyMembersCardVisible();
    await this.clickAddFamilyMember();
    await this.fillFamilyMemberForm(familyMemberData);
    await this.familyMemberModalDone();
    await this.validateFamilyMemberAdded(familyMemberData.familyName);
  }

  // ---------- Visa history: Add visa application ----------

  async validateVisaHistoryCardVisible() {
    logger.info('Validating Visa history card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.visaHistoryCardHeading(this.page));
  }

  /**
   * Opens "List and manage visa history", answers the three background questions
   * (default No unless overridden) and saves - saving is what reveals the "Add visa
   * application" list for the main applicant/family members.
   */
  async answerVisaHistoryQuestions(visaHistoryData = {}) {
    logger.info('Opening Visa history section');
    await WaitUtil.click(studentAddressLocators.addvisahistoryButton(this.page));

    const questions = [
      [studentAddressLocators.visaAppliedYesLabel(this.page), studentAddressLocators.visaAppliedNoLabel(this.page), visaHistoryData.hasAppliedForVisa],
      [studentAddressLocators.visaRefusedYesLabel(this.page), studentAddressLocators.visaRefusedNoLabel(this.page), visaHistoryData.hasBeenRefusedVisa],
      [studentAddressLocators.visaBreachedYesLabel(this.page), studentAddressLocators.visaBreachedNoLabel(this.page), visaHistoryData.hasBreachedVisaCondition],
    ];
    for (const [yesLabel, noLabel, answerYes] of questions) {
      await WaitUtil.click(answerYes ? yesLabel : noLabel);
    }
    await WaitUtil.click(studentAddressLocators.saveVisaQuestionsButton(this.page));
    // The "Add visa application" list is (re)loaded via AJAX after saving; wait for the
    // main applicant's Add button specifically - it exists whether or not this is their
    // first-ever application, unlike the "VISA Applications" summary count (mainApplicant-
    // VisaApplicationsCount), which only renders once at least one application already exists.
    await WaitUtil.waitForVisible(studentAddressLocators.addVisaApplicationButton(this.page), 30000);
  }

  async clickAddVisaApplication() {
    logger.info('Clicking "Add visa application" for the main applicant');
    await WaitUtil.click(studentAddressLocators.addVisaApplicationButton(this.page));
    await WaitUtil.waitForVisible(studentAddressLocators.addVisaApplicationModal(this.page));
  }

  async fillVisaApplicationForm(visaApplicationData) {
    logger.info(`Filling Add visa application form: ${JSON.stringify(visaApplicationData)}`);

    await this.selectFromSelect2(studentAddressLocators.visaCountryDropdown(this.page), 'ddl_vis_countryV2', visaApplicationData.country, { matchLast: true });
    await this.selectFromSelect2(studentAddressLocators.visaTypeDropdown(this.page), 'ddl_vis_typeV2', visaApplicationData.visaType);
    await WaitUtil.fill(studentAddressLocators.visaApplicationDateInput(this.page), this.toIsoDate(visaApplicationData.applicationDate));
    await WaitUtil.fill(studentAddressLocators.visaDecisionDateInput(this.page), this.toIsoDate(visaApplicationData.decisionDate));
    await this.selectFromSelect2(studentAddressLocators.visaOutcomeDropdown(this.page), 'ddl_vis_outcomV2', visaApplicationData.outcome);

    // Grant number + validity period only render when the outcome is "Granted".
    if (visaApplicationData.outcome?.toLowerCase() === 'granted') {
      await WaitUtil.fill(studentAddressLocators.visaGrantNumberInput(this.page), visaApplicationData.grantNumber);
      await WaitUtil.fill(studentAddressLocators.visaValidityStartDateInput(this.page), this.toIsoDate(visaApplicationData.validityStartDate));
      await WaitUtil.fill(studentAddressLocators.visaValidityEndDateInput(this.page), this.toIsoDate(visaApplicationData.validityEndDate));
    }
  }

  async visaApplicationModalDone() {
    logger.info('Clicking Done on Add visa application modal');
    await WaitUtil.click(studentAddressLocators.visaApplicationDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  /**
   * End-to-end: open Visa history, answer the background questions, add a visa
   * application for the main applicant and confirm it was saved. Validated by the
   * "VISA Applications" summary count appearing afterward (>= 1) rather than a
   * before/after delta, since that summary card doesn't exist yet before an applicant's
   * very first application - a before-read would fail for a first-time applicant.
   */
  async visahistoryform(visaHistoryData, visaApplicationData) {
    await this.validateVisaHistoryCardVisible();
    await this.answerVisaHistoryQuestions(visaHistoryData);

    await this.clickAddVisaApplication();
    await this.fillVisaApplicationForm(visaApplicationData);
    await this.visaApplicationModalDone();

    const countLocator = studentAddressLocators.mainApplicantVisaApplicationsCount(this.page);
    await WaitUtil.waitForVisible(countLocator, 30000);
    expect(Number(await countLocator.innerText())).toBeGreaterThanOrEqual(1);
  }

  // ---------- Countries visited: Add details ----------

  async validateCountriesVisitedCardVisible() {
    logger.info('Validating Countries visited card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.countriesVisitedCardHeading(this.page));
  }

  /**
   * Opens "List all countries you have visited" and answers the background question
   * (defaults to Yes, which is what reveals the per-applicant "Add details" list), then
   * opens the Add Countries visited modal for the main applicant.
   */
  async clickAddCountryVisited(hasVisitedOtherCountries = true) {
    logger.info('Opening Countries visited section');
    await WaitUtil.click(studentAddressLocators.addcountriesvisitedButton(this.page));
    await WaitUtil.click(hasVisitedOtherCountries
      ? studentAddressLocators.hasVisitedCountriesYesLabel(this.page)
      : studentAddressLocators.hasVisitedCountriesNoLabel(this.page));
    await this.page.waitForTimeout(1000); // per-applicant list is (re)loaded via AJAX after the answer

    logger.info('Clicking "Add details" for the main applicant');
    await WaitUtil.click(studentAddressLocators.addCountryVisitedDetailsButton(this.page));
    await WaitUtil.waitForVisible(studentAddressLocators.addCountryVisitedModal(this.page));
  }

  async fillCountryVisitedForm(countryVisitedData) {
    logger.info(`Filling Add Countries visited form: ${JSON.stringify(countryVisitedData)}`);
    await this.selectFromSelect2(studentAddressLocators.visitedCountryDropdown(this.page), 'ddlTrvHisCountry', countryVisitedData.country, { matchLast: true });
    await WaitUtil.fill(studentAddressLocators.arrivalDateInput(this.page), this.toIsoDate(countryVisitedData.arrivalDate));
    await WaitUtil.fill(studentAddressLocators.departureDateInput(this.page), this.toIsoDate(countryVisitedData.departureDate));
  }

  async countryVisitedModalDone() {
    logger.info('Clicking Done on Add Countries visited modal');
    await WaitUtil.click(studentAddressLocators.saveCountryVisitedButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  /**
   * End-to-end: open Countries visited, add a country for the main applicant, and
   * confirm it shows up on the main applicant's card.
   */
  async countriesvisitedform(countryVisitedData) {
    await this.validateCountriesVisitedCardVisible();
    await this.clickAddCountryVisited();
    await this.fillCountryVisitedForm(countryVisitedData);
    await this.countryVisitedModalDone();
    await expect(studentAddressLocators.mainApplicantCountriesVisitedCard(this.page)).toContainText(countryVisitedData.country, { timeout: 15000 });
  }

  // ---------- Finances: weekly income, support question & Add Sponsor ----------

  async validateFinancesCardVisible() {
    logger.info('Validating Finances card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.financesCardHeading(this.page));
  }

  async clickAddFinances() {
    logger.info('Opening Finances section');
    await WaitUtil.click(studentAddressLocators.addfinancesButton(this.page));
  }

  /**
   * Fills the weekly-income/financial-support questions and saves. "Provide details"
   * only renders once "Yes" is selected for financial support.
   */
  async fillFinanceQuestions(financeData) {
    logger.info(`Filling finance questions: ${JSON.stringify(financeData)}`);
    await WaitUtil.fill(studentAddressLocators.weeklyIncomeInput(this.page), String(financeData.weeklyIncome));
    await WaitUtil.click(financeData.requiresFinancialSupport
      ? studentAddressLocators.financialSupportYesLabel(this.page)
      : studentAddressLocators.financialSupportNoLabel(this.page));
    if (financeData.requiresFinancialSupport) {
      await WaitUtil.fill(studentAddressLocators.supportDetailsTextarea(this.page), financeData.supportDetails);
    }
    await WaitUtil.click(studentAddressLocators.saveFinanceQuestionsButton(this.page));
  }

  async clickAddSponsor() {
    logger.info('Clicking "Add Sponsor"');
    await WaitUtil.click(studentAddressLocators.addSponsorButton(this.page));
    await WaitUtil.waitForVisible(studentAddressLocators.addSponsorModal(this.page));
  }

  /**
   * Fills the Add Sponsor form. The income-details panel (currency + amount, this
   * year/last year) only renders once the "Does the person have Annual income?"
   * toggle is switched on, so it's filled only when annualIncome data is supplied.
   */
  async fillSponsorForm(sponsorData) {
    logger.info(`Filling Add Sponsor form: ${JSON.stringify(sponsorData)}`);
    await this.selectFromSelect2(studentAddressLocators.sponsorRelationshipDropdown(this.page), 'ddlRelationShip_Sponsor', sponsorData.relationship);
    await WaitUtil.fill(studentAddressLocators.sponsorFirstNameInput(this.page), sponsorData.givenName);
    await WaitUtil.fill(studentAddressLocators.sponsorMiddleNameInput(this.page), sponsorData.middleName || '');
    await WaitUtil.fill(studentAddressLocators.sponsorLastNameInput(this.page), sponsorData.familyName);
    await this.selectFromSelect2(studentAddressLocators.sponsorCountryDropdown(this.page), 'ddlCountry_Sponsor', sponsorData.country, { matchLast: true });

    if (sponsorData.annualIncome) {
      await WaitUtil.click(studentAddressLocators.sponsorAnnualIncomeToggleLabel(this.page));
      await this.selectFromSelect2(studentAddressLocators.sponsorCYCurrencyDropdown(this.page), 'ddlCountry_CYcurrency', sponsorData.annualIncome.currentYearCurrency);
      await WaitUtil.fill(studentAddressLocators.sponsorCYIncomeInput(this.page), String(sponsorData.annualIncome.currentYearAmount));
      await this.selectFromSelect2(studentAddressLocators.sponsorLYCurrencyDropdown(this.page), 'ddlCountry_LYcurrency', sponsorData.annualIncome.lastYearCurrency);
      await WaitUtil.fill(studentAddressLocators.sponsorLYIncomeInput(this.page), String(sponsorData.annualIncome.lastYearAmount));
    }
  }

  async sponsorModalDone() {
    logger.info('Clicking Done on Add Sponsor modal');
    await WaitUtil.click(studentAddressLocators.sponsorModalDoneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  /**
   * End-to-end: open Finances, answer the weekly-income/support questions, add a
   * sponsor and confirm the sponsor row appears in the Sponsors table. .last() guards
   * against strict-mode failures on a shared/persistent student with prior sponsor rows.
   */
  async financesform(financeData, sponsorData) {
    await this.validateFinancesCardVisible();
    await this.clickAddFinances();
    await this.fillFinanceQuestions(financeData);
    await this.clickAddSponsor();
    await this.fillSponsorForm(sponsorData);
    await this.sponsorModalDone();
    await expect(studentAddressLocators.sponsorRow(this.page, sponsorData.givenName).last()).toBeVisible({ timeout: 15000 });
  }

  // ---------- OSHC: Manage OSHC details ----------

  async validateOshcCardVisible() {
    logger.info('Validating OSHC card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.oshcCardHeading(this.page));
  }

  /**
   * Opens "Manage OSHC details" and answers both background questions (default No/No,
   * for a student who has not yet arranged cover), then saves.
   */
  async oshcform(oshcData = {}) {
    await this.validateOshcCardVisible();
    logger.info('Opening OSHC section');
    await WaitUtil.click(studentAddressLocators.addoshcButton(this.page));

    await WaitUtil.click(oshcData.hasOshc
      ? studentAddressLocators.hasOshcYesLabel(this.page)
      : studentAddressLocators.hasOshcNoLabel(this.page));
    await WaitUtil.click(oshcData.awareOfRequirement
      ? studentAddressLocators.awareOshcRequirementYesLabel(this.page)
      : studentAddressLocators.awareOshcRequirementNoLabel(this.page));

    await WaitUtil.click(studentAddressLocators.saveOshcButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  // ---------- Resume: Attach resume ----------

  async validateResumeCardVisible() {
    logger.info('Validating Resume card is visible');
    await WaitUtil.waitForVisible(studentAddressLocators.resumeCardHeading(this.page));
  }

  /**
   * Opens "Manage resume" and attaches a resume file for the main applicant. The
   * button drives a hidden <input type="file"> rather than a modal, so the upload
   * goes through Playwright's native file-chooser event.
   */
  async resumeform(resumeFilePath) {
    await this.validateResumeCardVisible();
    logger.info('Opening Resume section');
    await WaitUtil.click(studentAddressLocators.addresumeButton(this.page));

    const absolutePath = path.join(process.cwd(), resumeFilePath);
    logger.info(`Attaching resume: ${absolutePath}`);
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      studentAddressLocators.attachResumeButton(this.page).click(),
    ]);
    await fileChooser.setFiles(absolutePath);

    await expect(studentAddressLocators.mainApplicantResumeFileDisplay(this.page))
      .toContainText(path.basename(resumeFilePath), { timeout: 15000 });
  }

  // ---------- Orchestration ----------

  async addResidentialAddress(addressData, passportData, qualificationData, employmentData, studentName, languageAbilityData, familyMemberData, visaHistoryData, visaApplicationData, countryVisitedData, financeData, sponsorData, oshcData, resumeFilePath) {
    await this.validateAddressCardVisible();
    await this.clickAddAddress(studentName);
    await this.fillAddressForm(addressData);
    await this.addressModalDone();
    await this.navigateBack();
    await this.validatepassportCardVisible();
   await this.clickAddpassport(studentName);
    await this.fillpassportForm(passportData);
    await this.passportModalDone();
    await this.navigateBack();
    await this.validateacademicCardVisible();
    await this.clickAddacademic(studentName);
    await this.fillacademicsForm({ qualifications: qualificationData });
    await this.qualificationModalDone();
    await this.navigateBack();
   await this.validateemploymentCardVisible();
    await this.clickAddemployment(studentName);
    await this.fillemploymentForm({ employments: employmentData });
    await this.employmentModalDone();
    await this.navigateBack();
  
    await this.languageabilityForm(languageAbilityData);
    await this.navigateBack();
    await this.familymembersForm(familyMemberData);
    await this.navigateBack();
    
    await this.visahistoryform(visaHistoryData, visaApplicationData);
    await this.navigateBack();
    await this.countriesvisitedform(countryVisitedData);
    await this.navigateBack();
    

    await this.financesform(financeData, sponsorData);
    await this.navigateBack();
    
    // OSHC's own Done click already returns to the tile grid (unlike every other section
    // here), so no navigateBack() after it - "Go back" is hidden once you're already there.
    await this.oshcform(oshcData);
    await this.resumeform(resumeFilePath);
    // await this.validateAddressAdded(addressData.addressLine1);
    // await this.clickModalDone();
   // await this.clickPageDone();
  }
}

module.exports = StudentAddressPage;
