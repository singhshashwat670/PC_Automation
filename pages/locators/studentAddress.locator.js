const studentAddressLocators = {
  // ---------- Admissions search results ----------
  studentSearchResultLink: (page, studentEmail) =>
    page.locator('tbody tr').filter({ hasText: studentEmail }).first().getByRole('link').first(),

  // ---------- Student Profile page ----------
  profileTab: (page) =>
  page.getByText('Student Profile', { exact: true }),
  applicationsTab: (page) =>
    page.getByRole('tab', { name: 'Applications', exact: true }).or(page.getByText('Applications', { exact: true })),

  // ---------- My Address card ----------
  
  //noAddressAddedText: (page) => page.getByText('No Address added', { exact: true }),
  // Scoped by the tile's onclick target rather than visible text/role, since every
  // profile tile (Address, Passport, Academics, Employment, ...) renders an
  // identically-named "Add" link and a bare role/name locator matches all of them.
  
  
  // ---------- Add Address modal ----------
  // Assumption: modal exposes role="dialog" (common in modern component libraries).
  // Falls back to a class-based lookup if the real markup differs - verify with DevTools.
 // addAddressModal: (page) => page.getByRole('dialog').filter({ hasText: 'Add Address' }).or(page.locator('.modal, .modal-content').filter({ hasText: 'Add Address' })).first(),
addressCardHeading: (page) => page.getByText('Address', { exact: true }),
addAddressButton: (page) => page.locator('a.clsmanage[onclick*="InitAddress"]'),
 studentNameText: (page, studentName) => page.locator('div.info-name').filter({ hasText: studentName }),
  addnewAddress: (page) => page.locator('a[onclick="AddNewAddress(this);"]'),
 addAddressModal: (page) => page.getByRole('heading', { name: 'Add Address' }) ,
countrydropdown: (page) => page.locator('#select2-ddl_per_cntry-container'),
 statedropdown: (page) => page.locator('#select2-ddl_per_state-container'),
 cityInput: (page) => page.locator('#txt_per_city'),

 citySuggestionList: (page) => page.locator('ul.ui-autocomplete.ui-menu:visible'),
 citySuggestionOption: (page, city) =>
   studentAddressLocators.citySuggestionList(page).getByText(city, { exact: true }),

 // Generic select2 dropdown search field / option, keyed by the underlying <select> id.
 select2SearchField: (page, selectId) =>
   page.locator(`input.select2-search__field[aria-controls="select2-${selectId}-results"]`),
 select2Option: (page, selectId, text) =>
   page.locator(`li.select2-results__option[id^="select2-${selectId}-result"]`).filter({ hasText: text }),
 addressLine1Input: (page) => page.locator('#txtAddressLine1'),
 postcodeInput: (page) => page.locator('#txt_per_postcode'),
 durationInput: (page) => page.locator('#txt_dur_liv'),
 durationdropdown: (page) => page.locator('#select2-ddl_dur_liv_type-container'),
 //residentialTab: (modal) => modal.getByText('Residential', { exact: true }),
 // postalTab: (modal) => modal.getByText('Postal', { exact: true }),
  addressDoneButton: (page) =>page.locator('#btn_saveAddrss') ,
  residentialAddressValue: (page) => page.locator('div.info-label:text-is("Residential Address") + div.info-name'),
  navigateBackButton: (page) => page.locator('#btnMainBack'),

  // ---------- Add passport details ----------
 
  passportCardHeading: (page) => page.locator('div').filter({ hasText: 'Passport' }).first(),
    addpassportButton: (page) => page.locator('a.clsmanage[onclick*="InitPassport"]'),
  addnewpassport: (page) => page.locator('button[onclick="LoadPopPass(this);"]'),
   addpassportModal: (page) => page.getByRole('heading', { name: 'Add passport' }) ,
countryissuedropdown: (page) => page.locator('#select2-ddlpass_cntry-container'),
pnoInput: (page) => page.locator('#txtpass_number'),
issuingAuthorityInput: (page) => page.locator('#txtpass_IssueAuth'),
dateofissueInput: (page) => page.locator('#dtpass_DOI'),
dateofexpiryInput: (page) => page.locator('#dtpass_DOE'),
 passportDoneButton: (page) => page.locator('#btnsavePass'),

 // ---------- Add academicdetails ----------

 academicCardHeading: (page) => page.getByText('Academics', { exact: true }),
 addacademicButton: (page) => page.locator('a.clsmanage[onclick*="InitAcademics"]'),
 studyAustraliaNoRadio: (page) => page.locator('#pnl_is_study_aust').getByRole('radio', { name: 'No', exact: true }),
 addQualificationButton: (page) => page.getByRole('button', { name: 'Add qualification' }),
 addqualificationModal: (page)=> page.getByRole('heading', { name: 'Add qualification' }) ,
 // PLACEHOLDER ids - inspect the real elements in DevTools and correct below.
 qualificationCountryDropdown: (page) => page.locator('#select2-ddl_edu_cntry-container'),
 qualificationStateDropdown: (page) => page.locator('#select2-ddl_edu_state-container'),
 qualificationCityInput: (page) => page.locator('#txt_edu_city'),
 qualificationTextInput: (page) => page.locator('#txt_edu_qualifctn'),
 mediumOfInstructionDropdown: (page) => page.locator('#select2-ddl_medium_inst-container'),
 instituteNameInput: (page) => page.locator('#txt_edu_studyAt'),
 awardingBodyInput: (page) => page.locator('#txt_edu_award'),
 // Study status: Completed / Currently undertaking / Dropped
 // The "Study status" <h4> is a sibling of the radio group, not its ancestor,
 // so we scope from the heading's parent container rather than chaining off the heading.
 studyStatusRadio: (page, status) => page.locator( 'label[for="rad_edu_comp"]'),
 qualificationStartDateInput: (page) => page.locator('#txt_edu_startDt'),
 qualificationEndDateInput: (page) => page.locator('#txt_edu_endDt'),
 scoreTypeDropdown: (page) => page.locator('#select2-ddl_edu_score_type-container'),
 scoreInput: (page) => page.locator('#txt_edu_score'),
fullTimeRadio: (page, answer) => page.locator('label[for="radio0"]'),
highestQualificationRadio: (page, answer) =>page.locator('label[for="radio12"]'),
   
 //addQualificationSubmitButton: (page) => page.locator('button[onclick="saveAcademics(this)"]'),
 qualificationModalDoneButton: (page) =>page.locator('button[onclick="saveAcademics(this)"]'),

  academicsForm: (page) => page.locator('#academicForm'),
  employmentForm: (page) => page.locator('#employmentForm'),
  languageabilityForm: (page) => page.locator('#languageAbilityForm'),
  familymembersForm: (page) => page.locator('#familyMembersForm'),

  // ---------- Add Employment modal ----------

  employmentCardHeading: (page) => page.getByText('Employment', { exact: true }),
  addemploymentButton: (page) => page.locator('a.clsmanage[onclick*="InitEmployment"]'),
  employmentHistoryYesRadio: (page) => page.locator('#eduEmpY'),
  employmentHistoryYesLabel: (page) => page.locator('label[for="eduEmpY"]'),
  addEmploymentButton: (page) => page.getByRole('button', { name: 'Add employment' }),
  addemploymentModal: (page) => page.getByRole('heading', { name: 'Add employment' }),

  employmentStatusDropdown: (page) => page.locator('#select2-ddlEmploymentStatus-container'),
  currentEmploymentToggle: (page) => page.locator('#chk_emp_current'),
  orgNameInput: (page) => page.locator('#lblBusinessName'),
  industryTypeDropdown: (page) => page.locator('#select2-ddlIndustryType-container'),
  employmentCountryDropdown: (page) => page.locator('#select2-ddlCountry_emp-container'),
  employmentStateDropdown: (page) => page.locator('#select2-ddlState-container'),
  employmentCityInput: (page) => page.locator('#txtCityTNAllow'),
  employmentAddressLine1Input: (page) => page.locator('#txtAddressLine1'),
  
  contactGivenNameInput: (page) => page.locator('#lblGivenNameContact'),
  contactMiddleNameInput: (page) => page.locator('#lblMiddelNameContact'),
  contactFamilyNameInput: (page) => page.locator('#lblFamilyNameContact'),
  mobileCountryDropdown: (page) => page.locator('#select2-ddlMobileCountryCodeContact-container'),
  mobileNumberInput: (page) => page.locator('#txtMobileNoContact'),
  positionInput: (page) => page.locator('#txtPositionDetailContact'),
  employmentStartDateInput: (page) => page.locator('#dtpFromDate'),
  employmentEndDateInput: (page) => page.locator('#dtpToDate'),
  employmentDoneButton: (page) => page.locator('button[onclick="SaveEmploymentDetails()"]'),
 

  // ---------- Language Ability card & Add English Test ----------
  // NOTE: as with the Employment section above, the real markup was not available for
  // inspection (only screenshots) - locators below are best-effort, text/role-scoped
  // where the screenshot gives an exact label, and PLACEHOLDER ids elsewhere. Verify
  // against DevTools before relying on these in a real run.
  languageAbilityCardHeading: (page) => page.getByText('Language Ability', { exact: true }),
  addlanguageabilityButton: (page) => page.locator('a.clsmanage[onclick*="InitLanguage"]'),
  englishAbilityQuestionHeading: (page) =>
    page.getByText('Please select the applicable option to confirm English language ability', { exact: true }),
  // Each "option" toggle is scoped from the row of text it sits next to, since these
  // are independent switches (not a mutually-exclusive radio group) and no id is known.
  englishAbilityToggle: (page, labelText) =>
    page.locator('div').filter({ hasText: labelText }).locator('input[type="checkbox"]').first(),

  noEnglishAbilityAddedText: (page) => page.getByText('No English ability added yet.', { exact: true }),
  addEnglishTestButton: (page) => page.getByRole('button', { name: 'Add English Test', exact: true }),
  // Dropdown menu is identified by containing several of its known option labels together,
  // since it has no distinguishing id/role of its own in the screenshot.
  addEnglishTestDropdownMenu: (page) =>
    page.locator('ul, div').filter({ hasText: 'DUOLINGO' }).filter({ hasText: 'IELTS' }).first(),
  addEnglishTestDropdownOption: (page, testType) =>
    studentAddressLocators.addEnglishTestDropdownMenu(page).getByText(testType, { exact: true }),

  // Row in the "List language tests undertaken by the applicants" table, after an entry
  // has been saved (via the modal below, or directly for non-modal options).
  languageTestRow: (page, testType) => page.locator('tr').filter({ hasText: testType }).first(),
  languageTestAttachButton: (page, testType) =>
    studentAddressLocators.languageTestRow(page, testType).getByRole('button', { name: 'Attach', exact: true }),

  // ---------- Add English test modal (graded tests: IELTS/PTE/TOEFL/...) ----------
  // Heading reads "Add English test - {TestType}" (e.g. "Add English test - IELTS").
  addEnglishTestModal: (page) =>
    page.locator('div.modal, [role="dialog"]').filter({ has: page.getByRole('heading', { name: /^Add English test/ }) }),
  // TYPE renders as a plain native <select> (options list with no search box), unlike the
  // select2 country/state dropdowns elsewhere in this app - use selectOption(), not click+search.
  englishTestTypeDropdown: (page) => studentAddressLocators.addEnglishTestModal(page).locator('select').first(),
  englishTestDateInput: (page) =>
    studentAddressLocators.addEnglishTestModal(page).locator('div').filter({ hasText: 'TEST DATE' }).locator('input').first(),
  englishTestReportNumberInput: (page) =>
    studentAddressLocators.addEnglishTestModal(page).locator('div').filter({ hasText: 'TEST REPORT NUMBER' }).locator('input').first(),
  englishTestModuleRow: (page, moduleName) =>
    studentAddressLocators.addEnglishTestModal(page).locator('tr').filter({ hasText: moduleName }).first(),
  englishTestModuleScoreInput: (page, moduleName) =>
    studentAddressLocators.englishTestModuleRow(page, moduleName).locator('input').first(),
  englishTestModalDoneButton: (page) =>
    studentAddressLocators.addEnglishTestModal(page).getByRole('button', { name: 'Done', exact: true }),
  englishTestModalCancelButton: (page) =>
    studentAddressLocators.addEnglishTestModal(page).getByRole('button', { name: 'Cancel', exact: true }),

  // ---------- Test evidences modal ----------
  testEvidenceModal: (page) =>
    page.locator('div.modal, [role="dialog"]').filter({ has: page.getByRole('heading', { name: /^Test evidences/ }) }),
  testEvidenceFileInput: (page) => studentAddressLocators.testEvidenceModal(page).locator('input[type="file"]'),
  testEvidenceDoneButton: (page) => studentAddressLocators.testEvidenceModal(page).getByRole('button', { name: 'Done', exact: true }),
  testEvidenceCancelButton: (page) => studentAddressLocators.testEvidenceModal(page).getByRole('button', { name: 'Cancel', exact: true }),

  languageAbilityDoneButton: (page) => page.locator('button[onclick="saveLanguageAbility(this)"]'),

};

module.exports = studentAddressLocators;
