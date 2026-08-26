const admissionLocators = {
  // ---------- Top navigation ----------
  educationProvidersMenu: (page) => page.getByRole('link', { name: /Education providers/i }),
  applicationsMenuItem: (page) => page.getByText('Applications', { exact: true }),
  admissionsMenuItem: (page) => page.getByText('Admissions', { exact: true }),

  // ---------- Admissions listing page ----------
  admissionsPageIndicator: (page) => page.getByRole('heading', { name: 'Admissions', exact: true }),
  newStudentButton: (page) => page.getByRole('link', { name: /New student/i }),
  searchStudentInput: (page) => page.getByLabel('Search', { exact: true }),
  searchResultRowByName: (page, studentName) => page.locator('tbody tr').filter({ hasText: studentName }).first(),
  searchResultRowByEmail: (page, studentEmail) => page.locator('tbody tr').filter({ hasText: studentEmail }).first(),
  resultsSummaryText: (page) => page.getByText(/showing \d+ of \d+ records/i),

  // ---------- Create Student form ----------
  createStudentHeading: (page) => page.getByRole('heading', { name: 'Create Student', exact: true }),
  studentEmailInput: (page) => page.locator('#txtEmail').first(),
  mobileCountryCodeDropdown: (page) => page.locator('#select2-ddlMobileCountry-container').first(),
  mobileNumberInput: (page) => page.locator('#txtMobile').first(),
  titleDropdown: (page) => page.locator('#select2-ddlTitle-container').first(),
  givenNameInput: (page) => page.locator('#txtFirstName').first(),
  middleNameInput: (page) => page.locator('#txtMiddleName').first(),
  familyNameInput: (page) => page.locator('#txtLastName').first(),
  preferredNameInput: (page) =>page.locator('#txtPreferredName').first(),
  genderDropdown: (page) => page.locator('#select2-ddlGender-container'),
  dateOfBirthInput: (page) => page.locator('#dtDob').first(),
  maritalStatusDropdown: (page) => page.locator('#select2-ddlMaritalStatus-container').first(),
  // Rendered dynamically only when Marital Status = Married. Confirm/update the ID via
  // DevTools if the underlying markup changes (see #dtDob for the sibling date field pattern).
  dateOfMarriageInput: (page) => page.locator('#dtMarriage').first(),
  preferredStudyDestinationDropdown: (page) => page.locator('#select2-ddlPrefStudyDestination-container').first(),
  countryOfBirthDropdown: (page) => page.locator('#select2-ddlCountryBirth-container').first(),
  countryOfCitizenshipDropdown: (page) => page.locator('#select2-ddlCitizen-container').first(),
  countryOfResidencyDropdown: (page) => page.locator('#select2-ddlResident-container').first(),

  // ---------- Emergency contact ----------
  emergencyGivenNameInput: (page) => page.locator('#txtEmrGivenName').first(),
  emergencyFamilyNameInput: (page) =>page.locator('#txtEmrFamilyName').first() ,
  emergencyRelationshipDropdown: (page) =>page.locator('#select2-ddlEmrRelationship-container').first(),
  emergencyEmailInput: (page) => page.locator('#txtEmrEmail').first(),
  emergencyMobileCountryCodeDropdown: (page) => page.locator('#select2-ddlEmrMobileCountry-container').first(),
  emergencyMobileNumberInput: (page) => page.locator('#txtEnrMobile').first(),

  englishFirstLanguageOption: (page, answer) =>page.locator('label').filter({ hasText: new RegExp(`^${answer}$`, 'i') }),

  doneButton: (page) => page.getByRole('button', { name: 'Done', exact: true }),
  cancelButton: (page) => page.getByRole('button', { name: 'Cancel', exact: true }),

  // ---------- Student profile page ----------
  studentProfileHeading: (page) => page.getByText('Student Profile'),
  createdStudentNameText: (page, studentName) =>
    page.locator('span').filter({ hasText: studentName }).first(),
  
};

module.exports = admissionLocators;
