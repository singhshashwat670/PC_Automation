const admissionLocators = require('./locators/admission.locator');
const { expect } = require('@playwright/test');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');

class AdmissionPage {
  constructor(page) {
    this.page = page;
  }

  // ---------- Navigation ----------

  async navigateToAdmissionsModule() {
    logger.info('Navigating: Education Providers > Applications > Admissions');

    const educationProvidersMenu = admissionLocators.educationProvidersMenu(this.page);
     //await educationProvidersMenu.waitFor({ state: 'visible'});
    await educationProvidersMenu.hover();
    await educationProvidersMenu.click();

    await WaitUtil.click(admissionLocators.applicationsMenuItem(this.page));
    await WaitUtil.click(admissionLocators.admissionsMenuItem(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  async validateAdmissionsPageLoaded() {
    logger.info('Validating Admissions page loaded');
    await WaitUtil.waitForVisible(admissionLocators.admissionsPageIndicator(this.page));
  }

  // ---------- Create student ----------

  async clickNewStudent() {
    logger.info('Clicking New student button');
    await WaitUtil.click(admissionLocators.newStudentButton(this.page));
    await WaitUtil.waitForVisible(admissionLocators.createStudentHeading(this.page));
  }

  async enterStudentEmail(email) {
    logger.info(`Entering student email: ${email}`);
    await WaitUtil.fill(admissionLocators.studentEmailInput(this.page), email);
  }

  async selectMobileCountryCode(countryCode) {
    logger.info(`Selecting mobile country code: ${countryCode}`);
    await WaitUtil.click(admissionLocators.mobileCountryCodeDropdown(this.page));

    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlMobileCountry-results"]');
    await WaitUtil.fill(searchField, countryCode);

    const option = this.page.locator('li.select2-results__option[id^="select2-ddlMobileCountry-result"]').filter({ hasText: countryCode }).first();
    await WaitUtil.click(option);
  }

  async enterMobileNumber(number) {
    logger.info(`Entering mobile number: ${number}`);
    await WaitUtil.fill(admissionLocators.mobileNumberInput(this.page), number);
  }

  async selectTitle(title) {
    logger.info(`Selecting title: ${title}`);
    await WaitUtil.click(admissionLocators.titleDropdown(this.page));

   // const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlTitle-results"]');
    // await WaitUtil.fill(searchField, title);

    const option = this.page
      .locator('li.select2-results__option[id^="select2-ddlTitle-result"]')
      .filter({ hasText: new RegExp(`^${title}$`, 'i') })
      .first();
    await WaitUtil.click(option);
  }

  async enterGivenName(givenName) {
    logger.info(`Entering given name: ${givenName}`);
    await WaitUtil.fill(admissionLocators.givenNameInput(this.page), givenName);
  }

  async enterMiddleName(middleName) {
    if (!middleName) return;
    logger.info(`Entering middle name: ${middleName}`);
    await WaitUtil.fill(admissionLocators.middleNameInput(this.page), middleName);
  }

  async enterFamilyName(familyName) {
    if (!familyName) return;
    logger.info(`Entering family name: ${familyName}`);
    await WaitUtil.fill(admissionLocators.familyNameInput(this.page), familyName);
  }

  async enterPreferredName(preferredName) {
    if (!preferredName) return;
    logger.info(`Entering preferred name: ${preferredName}`);
    await WaitUtil.fill(admissionLocators.preferredNameInput(this.page), preferredName);
  }

  async selectGender(gender) {
    logger.info(`Selecting gender: ${gender}`);
    await WaitUtil.click(admissionLocators.genderDropdown(this.page));
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlGender"]').filter({ hasText: new RegExp(`^${gender}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async enterDateOfBirth(dobValue) {
    logger.info(`Entering date of birth: ${dobValue}`);
    const dobInput = admissionLocators.dateOfBirthInput(this.page);
    await WaitUtil.waitForVisible(dobInput);
    await dobInput.fill(dobValue);
  }

  async selectMaritalStatus(status) {
    logger.info(`Selecting marital status: ${status}`);
    await WaitUtil.click(admissionLocators.maritalStatusDropdown(this.page));
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlMaritalStatus-result"]').filter({ hasText: new RegExp(`^${status}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async enterDateOfMarriage(dateValue) {
    logger.info(`Entering date of marriage: ${dateValue}`);
    const dateOfMarriageInput = admissionLocators.dateOfMarriageInput(this.page);
    await WaitUtil.waitForVisible(dateOfMarriageInput);
    await dateOfMarriageInput.fill(dateValue);
  }

  /**
   * The Date of Marriage field is rendered by the page only when
   * Marital Status is "Married" (a Select2/JS-driven conditional field),
   * so it must never be filled unconditionally.
   */
  async handleDateOfMarriage(maritalStatus, dateOfMarriage) {
    if (maritalStatus && maritalStatus.trim().toLowerCase() === 'married') {
      await this.enterDateOfMarriage(dateOfMarriage);
    } else {
      logger.info(`Marital status is "${maritalStatus}" - Date of Marriage field is not applicable, skipping`);
    }
  }

  async selectPreferredStudyDestination(country) {
    logger.info(`Selecting preferred study destination: ${country}`);
    await WaitUtil.click(admissionLocators.preferredStudyDestinationDropdown(this.page));
    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlPrefStudyDestination-results"]');
    await WaitUtil.fill(searchField, country);
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlPrefStudyDestination-result"]').filter({ hasText: new RegExp(`^${country}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async selectCountryOfBirth(country) {
    logger.info(`Selecting country of birth: ${country}`);
    await WaitUtil.click(admissionLocators.countryOfBirthDropdown(this.page));
     const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlCountryBirth-results"]');
    await WaitUtil.fill(searchField, country);
      const option = this.page.locator('li.select2-results__option[id^="select2-ddlCountryBirth-result"]').filter({ hasText: new RegExp(`^${country}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async selectCountryOfCitizenship(country) {
    logger.info(`Selecting country of citizenship: ${country}`);
    await WaitUtil.click(admissionLocators.countryOfCitizenshipDropdown(this.page));
    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlCitizen-results"]');
    await WaitUtil.fill(searchField, country);
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlCitizen-result"]').filter({ hasText: new RegExp(`^${country}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async selectCountryOfResidency(country) {
    logger.info(`Selecting country of current residency: ${country}`);
    await WaitUtil.click(admissionLocators.countryOfResidencyDropdown(this.page));
    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlResident-results"]');
    await WaitUtil.fill(searchField, country);
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlResident-result"]').filter({ hasText: new RegExp(`^${country}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  // ---------- Emergency contact ----------

  async enterEmergencyGivenName(givenName) {
    logger.info(`Entering emergency contact given name: ${givenName}`);
    await WaitUtil.fill(admissionLocators.emergencyGivenNameInput(this.page), givenName);
  }

  async enterEmergencyFamilyName(familyName) {
    if (!familyName) return;
    logger.info(`Entering emergency contact family name: ${familyName}`);
    await WaitUtil.fill(admissionLocators.emergencyFamilyNameInput(this.page), familyName);
  }

  async selectEmergencyRelationship(relationship) {
    logger.info(`Selecting relationship to student: ${relationship}`);
    await WaitUtil.click(admissionLocators.emergencyRelationshipDropdown(this.page));
    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlEmrRelationship-results"]');
    await WaitUtil.fill(searchField, relationship);
    const option = this.page.locator('li.select2-results__option[id^="select2-ddlEmrRelationship-result"]').filter({ hasText: new RegExp(`^${relationship}$`, 'i') }).first();
    await WaitUtil.click(option);
  }

  async enterEmergencyEmail(email) {
    logger.info(`Entering emergency contact email: ${email}`);
    await WaitUtil.fill(admissionLocators.emergencyEmailInput(this.page), email);
  }

  async selectEmergencyMobileCountryCode(countryCode) {
    logger.info(`Selecting emergency contact mobile country code: ${countryCode}`);
    await WaitUtil.click(admissionLocators.emergencyMobileCountryCodeDropdown(this.page));
    const searchField = this.page.locator('input.select2-search__field[aria-controls="select2-ddlEmrMobileCountry-results"]');
    await WaitUtil.fill(searchField, countryCode);

    const option = this.page
      .locator('li.select2-results__option[id^="select2-ddlEmrMobileCountry-result"]')
      .filter({ hasText: countryCode })
      .first();
    await WaitUtil.click(option);
  }

  async enterEmergencyMobileNumber(number) {
    logger.info(`Entering emergency contact mobile number: ${number}`);
    await WaitUtil.fill(admissionLocators.emergencyMobileNumberInput(this.page), number);
  }

  async selectIsEnglishFirstLanguage(answer) {
    logger.info(`Selecting "Is English your first language": ${answer}`);
    await WaitUtil.click(admissionLocators.englishFirstLanguageOption(this.page, answer));
  }

  async clickDone() {
    logger.info('Clicking Done to create student');
    await WaitUtil.click(admissionLocators.doneButton(this.page));
    await WaitUtil.waitForPageLoad(this.page);
  }

  /**
   * Fills the full Create Student form, including the Emergency Contact
   * section, from a single student data object.
   */
  async createStudent(studentData, studentEmail) {
    await this.enterStudentEmail(studentEmail);
    await this.selectMobileCountryCode(studentData.mobileCountryCode);
    await this.enterMobileNumber(studentData.mobileNumber);
    await this.selectTitle(studentData.titleOption);
    await this.enterGivenName(studentData.givenName);
    await this.enterMiddleName(studentData.middleName);
    await this.enterFamilyName(studentData.familyName);
    await this.enterPreferredName(studentData.preferredName);
    await this.selectGender(studentData.genderOption);
    await this.enterDateOfBirth(studentData.dateOfBirth);
    await this.selectMaritalStatus(studentData.maritalStatusOption);
    await this.handleDateOfMarriage(studentData.maritalStatusOption, studentData.dateOfMarriage);
    await this.selectPreferredStudyDestination(studentData.preferredStudyDestinationOption);
    await this.selectCountryOfBirth(studentData.countryOfBirthOption);
    await this.selectCountryOfCitizenship(studentData.countryOfCitizenshipOption);
    await this.selectCountryOfResidency(studentData.countryOfResidencyOption);

    await this.enterEmergencyGivenName(studentData.emergencyContact.givenName);
    await this.enterEmergencyFamilyName(studentData.emergencyContact.familyName);
    await this.selectEmergencyRelationship(studentData.emergencyContact.relationshipOption);
    await this.enterEmergencyEmail(studentData.emergencyContact.email);
    await this.selectEmergencyMobileCountryCode(studentData.emergencyContact.mobileCountryCode);
    await this.enterEmergencyMobileNumber(studentData.emergencyContact.mobileNumber);

    await this.selectIsEnglishFirstLanguage(studentData.isEnglishFirstLanguage);
  }

  // ---------- Student profile validation ----------

  async validateCreatedStudentProfile(expectedGivenName) {
    logger.info(`Validating created student profile for: ${expectedGivenName}`);
    
    await WaitUtil.waitForVisible(admissionLocators.studentProfileHeading(this.page),30000);
    await WaitUtil.waitForVisible(admissionLocators.createdStudentNameText(this.page, expectedGivenName));
  }
async navigateBack() {
    await this.page.goBack();
}
  // ---------- Search ----------

  async searchStudent(searchText) {
    logger.info(`Searching for student: ${searchText}`);
    const searchInput = admissionLocators.searchStudentInput(this.page);
    await WaitUtil.fill(searchInput, searchText);
    await searchInput.press('Enter');
    await WaitUtil.waitForPageLoad(this.page);
  }

  async validateSearchResult(expectedName, expectedEmail) {
    logger.info(`Validating search result row for: ${expectedEmail}`);
    const row = admissionLocators.searchResultRowByEmail(this.page, expectedEmail);
    await WaitUtil.waitForVisible(row);
    await expect(row).toContainText(new RegExp(expectedName, 'i'));
    await expect(row).toContainText(expectedEmail);
  }
}

module.exports = AdmissionPage;
