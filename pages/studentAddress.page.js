const { expect } = require('@playwright/test');
const studentAddressLocators = require('./locators/studentAddress.locator');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');

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
  async clickAddAddress(studentName) {
    logger.info(`Validating student name "${studentName}" and "No Address added" text are visible`);
     await WaitUtil.click(studentAddressLocators.addAddressButton(this.page));
    logger.info('Clicking "click to add" on My Address card');
    await WaitUtil.waitForVisible(studentAddressLocators.studentNameText(this.page, studentName));
   // await WaitUtil.waitForVisible(studentAddressLocators.noAddressAddedText(this.page));
    await WaitUtil.clickUntilVisible(
      studentAddressLocators.addnewAddress(this.page),
      studentAddressLocators.addAddressModal(this.page),
      { timeout: 21000, retries: 3 }
    );
    
  }


  async fillAddressForm(addressData) {
    logger.info(`Filling Add Address form: ${JSON.stringify(addressData)}`);
    const modal = studentAddressLocators.addAddressModal(this.page);

    await this.selectcountry(addressData.country);
    await this.selectstate(addressData.state);
    await this.citytown(addressData.citySearchText, addressData.city);
    await this.addressline1(addressData.addressLine1);
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
    await WaitUtil.click(studentAddressLocators.navigateBackButton(this.page));
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


  // ---------- Orchestration ----------

  async addResidentialAddress(addressData, passportData, qualificationData,employmentData, studentName) {
   // await this.validateAddressCardVisible();
   // await this.clickAddAddress(studentName);
   // await this.fillAddressForm(addressData);
  //  await this.addressModalDone();
   // await this.navigateBack();
   // await this.validatepassportCardVisible();
   // await this.clickAddpassport(studentName);
   // await this.fillpassportForm(passportData);
    //await this.passportModalDone();
   // await this.navigateBack();
    //await this.validateacademicCardVisible();
    //await this.clickAddacademic(studentName);
    //await this.fillacademicsForm({ qualifications: qualificationData });
    //await this.qualificationModalDone();
   // await this.navigateBack();
     await this.validateemploymentCardVisible();
    await this.clickAddemployment(studentName);
    await this.fillemploymentForm({ employments: employmentData });
    //await this.employmentModalDone();
    await this.navigateBack();
  
    // await this.languageabilityForm(qualificationData);
    // await this.familymembersForm(qualificationData);
    // await this.visahistoryform(qualificationData);
    // await this.countriesvisitedform(qualificationData);
    // await this.finacesform(qualificationData);
    // await this.oshcform(qualificationData);
    // await this.resumeform(qualificationData);
    // await this.validateAddressAdded(addressData.addressLine1);
    // await this.clickModalDone();
   // await this.clickPageDone();
  }
}

module.exports = StudentAddressPage;
