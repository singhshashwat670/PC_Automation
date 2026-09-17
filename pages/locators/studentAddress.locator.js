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
// Scoped to #tileContainer (the landing tile grid) - "Address" etc. also repeat in the
// side-nav stepper and each section's own footer "Previous/Next" links, which an
// unscoped getByText collides with once enough sections have been visited in one run.
addressCardHeading: (page) => page.locator('#tileContainer').getByText('Address', { exact: true }),
addAddressButton: (page) => page.locator('a.clsmanage[onclick*="InitAddress"]'),
 // Every profile section (Address, Passport, Academics, ...) is pre-rendered in the DOM
 // simultaneously and toggled via a "d-none" class rather than mounted/unmounted, so an
 // unscoped match repeats once per section visited this session; :visible narrows to
 // whichever single section is currently on screen.
 studentNameText: (page, studentName) => page.locator('div.info-name:visible').filter({ hasText: studentName }),
  addnewAddress: (page) => page.locator('a[onclick="AddNewAddress(this);"]'),
  // The main applicant's row is the only "editAddress" trigger with data-ismain="1";
  // it opens the exact same "Add Address" modal, pre-filled, when an address already exists.
  mainApplicantEditAddressLink: (page) => page.locator('a[onclick="editAddress(this);"][data-ismain="1"]'),
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
 // The "My Address" modal's real address-line-1 field id (verified against the live DOM);
 // kept separate from addressLine1Input above since that one is also reused by the
 // (separately unverified) Employment address flow under a different field id.
 residentialAddressLine1Input: (page) => page.locator('#txt_per_add1'),
 postcodeInput: (page) => page.locator('#txt_per_postcode'),
 durationInput: (page) => page.locator('#txt_dur_liv'),
 durationdropdown: (page) => page.locator('#select2-ddl_dur_liv_type-container'),
 //residentialTab: (modal) => modal.getByText('Residential', { exact: true }),
 // postalTab: (modal) => modal.getByText('Postal', { exact: true }),
  addressDoneButton: (page) =>page.locator('#btn_saveAddrss') ,
  // .first() scopes to the main applicant's card, which always renders first; a shared/
  // persistent student otherwise has one "Residential Address" row per family member too.
  residentialAddressValue: (page) => page.locator('div.info-label:text-is("Residential Address") + div.info-name').first(),
  navigateBackButton: (page) => page.locator('#btnMainBack'),

  // ---------- Add passport details ----------
 
  passportCardHeading: (page) => page.locator('#tileContainer').getByText('Passport', { exact: true }),
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

 academicCardHeading: (page) => page.locator('#tileContainer').getByText('Academics', { exact: true }),
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

  // ---------- Add Employment modal ----------

  employmentCardHeading: (page) => page.locator('#tileContainer').getByText('Employment', { exact: true }),
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
  // Verified against the real DOM (StudentTileDetails.aspx) rather than screenshots.
  languageAbilityCardHeading: (page) => page.locator('#tileContainer').getByText('Language Ability', { exact: true }),
  addlanguageabilityButton: (page) => page.locator('a.clsmanage[onclick*="InitEnglish"]'),
  englishAbilityQuestionHeading: (page) =>
    page.getByText('Please select the applicable option to confirm English language ability', { exact: true }),

  // Each option is an independent on/off switch (not a mutually-exclusive radio group),
  // each with its own stable input id - e.g. "has_taken_eng_tests", "fam_has_taken_eng_tests".
  englishAbilityToggleInput: (page, toggleId) => page.locator(`#${toggleId}`),
  englishAbilityToggleLabel: (page, toggleId) => page.locator(`label[for="${toggleId}"]`),

  // "Add English Test" renders as a Bootstrap dropdown button, populated for the main
  // applicant only after at least one ability toggle above is switched on.
  englishCardsContainer: (page) => page.locator('#dv_english_cards'),
  addEnglishTestButton: (page) => studentAddressLocators.englishCardsContainer(page).locator('a[data-toggle="dropdown"]').first(),
  addEnglishTestDropdownOption: (page, testType) =>
    studentAddressLocators.englishCardsContainer(page)
      .locator('.dropdown-item')
      .filter({ hasText: new RegExp(`^${testType}$`, 'i') }),

  // Row in the "List language tests undertaken by the applicants" table, after an entry
  // has been saved.
  languageTestRow: (page, testType) => page.locator('tr').filter({ hasText: testType }).first(),
  languageTestAttachButton: (page, testType) =>
    studentAddressLocators.languageTestRow(page, testType).getByRole('button', { name: 'Attach', exact: true }),

  // ---------- Add English test modal: DUOLINGO ----------
  // Heading reads "Add English test - DUOLINGO"; this type has its own modal/field ids,
  // separate from every other (graded) test type below.
  addEnglishTestDuolingoModal: (page) => page.locator('#addEngtestDulingo'),
  duolingoTestDateInput: (page) => page.locator('#dt_duolingo'),
  duolingoReportNumberInput: (page) => page.locator('#txtduolingo'),
  // Module score field ids are not a consistent pattern (mixed case, "verall" typo for
  // "overall") - callers look the real id up by friendly key, see DUOLINGO_SCORE_FIELDS
  // in studentAddress.page.js, rather than deriving it here.
  duolingoModuleScoreInput: (page, fieldId) => page.locator(`#${fieldId}`),
  duolingoDoneButton: (page) => page.locator('#_saveduolingo'),

  // ---------- Add English test modal: graded tests (IELTS/PTE/TOEFL/OET/CAE/LANGUAGECERT) ----------
  // Heading reads "Add English test - {TestType}"; every graded type shares this one
  // modal/id set (only the TYPE dropdown options and heading text change per type).
  addEnglishTestGradedModal: (page) => page.locator('#addEngtest'),
  gradedTestDateInput: (page) => page.locator('#_englishEFrm'),
  gradedTestReportNumberInput: (page) => page.locator('#txtenglishrptNo'),
  gradedModuleScoreInput: (page, fieldId) => page.locator(`#${fieldId}`),
  gradedTestDoneButton: (page) => page.locator('#_saveenglish'),

  // ---------- Family members card & Add family member ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "My family members" section).
  familyMembersCardHeading: (page) => page.locator('#tileContainer').getByText('Family members', { exact: true }),
  addfamilymembersButton: (page) => page.locator('a.clsmanage[onclick*="InitFamily"]'),
  hasFamilyMembersYesRadio: (page) => page.locator('#rdoIsFamMember'),
  hasFamilyMembersYesLabel: (page) => page.locator('label[for="rdoIsFamMember"]'),
  addFamilyMemberButton: (page) => page.locator('#btnSaveFamMember'),
  addFamilyMemberModal: (page) => page.getByRole('heading', { name: 'Add family member' }),

  familyRelationshipDropdown: (page) => page.locator('#select2-ddlRelationship_famV2-container'),
  familyNationalityDropdown: (page) => page.locator('#select2-ddlCountry_famV2-container'),
  familyTitleDropdown: (page) => page.locator('#select2-ddlTitle_famV2-container'),
  familyGivenNameInput: (page) => page.locator('#txtfirst_name_famV2'),
  familyMiddleNameInput: (page) => page.locator('#txtmiddle_name_famV2'),
  familyFamilyNameInput: (page) => page.locator('#txtlast_name_famV2'),
  familyGenderDropdown: (page) => page.locator('#select2-ddlGender_famV2-container'),
  familyDobInput: (page) => page.locator('#txtdob_famV2'),
  // Marital status "Married" reveals this date field (showhidedtfmV2 onchange handler); stays hidden for "Single".
  familyMaritalStatusDropdown: (page) => page.locator('#select2-ddlMaritalStatus_famV2-container'),
  familyMarriageDateInput: (page) => page.locator('#txtmarriage_date_famV2'),
  familyEmailInput: (page) => page.locator('#txtFamEmail'),
  familyMobileCountryDropdown: (page) => page.locator('#select2-ddlFamMobileCountry-container'),
  familyMobileInput: (page) => page.locator('#txtFamMobile'),
  // State list is populated via AJAX (bindStateByCountryId) once a country is selected.
  familyCountryDropdown: (page) => page.locator('#select2-ddlFamilyCountry-container'),
  familyStateDropdown: (page) => page.locator('#select2-ddlFamilyState-container'),
  familyCityInput: (page) => page.locator('#txtFamCity'),
  familyStreet1Input: (page) => page.locator('#txtFamStreet1'),
  familyStreet2Input: (page) => page.locator('#txtFamStreet2'),
  familyPostcodeInput: (page) => page.locator('#txtFamPostCode'),
  familyTravelWithMainToggleLabel: (page) => page.locator('label[for="chkIsTravelWithMain"]'),
  familyMemberDoneButton: (page) => page.locator('button[onclick="saveNewMemberDetails();"]'),
  familyMemberRow: (page, familyMemberName) => page.locator('#tblFamilyListV2 tbody tr').filter({ hasText: familyMemberName }),

  // ---------- Visa history card & Add visa application ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "List and manage visa history" section).
  visaHistoryCardHeading: (page) => page.locator('#tileContainer').getByText('Visa history', { exact: true }),
  addvisahistoryButton: (page) => page.locator('a.clsmanage[onclick*="InitVisaProfile"]'),

  visaAppliedYesLabel: (page) => page.locator('label[for="eduVisaY"]'),
  visaAppliedNoLabel: (page) => page.locator('label[for="eduVisaN"]'),
  visaRefusedYesLabel: (page) => page.locator('label[for="eduRefusedVisaY"]'),
  visaRefusedNoLabel: (page) => page.locator('label[for="eduRefusedVisaN"]'),
  visaBreachedYesLabel: (page) => page.locator('label[for="eduBreachedVisaY"]'),
  visaBreachedNoLabel: (page) => page.locator('label[for="eduBreachedVisaN"]'),
  saveVisaQuestionsButton: (page) => page.locator('a[onclick="UpdateVisaQuestions();"]'),

  // "vis_0" is the main applicant's fixed slot; family members get their own dynamic slot ids.
  addVisaApplicationButton: (page) => page.locator('#btnAddVisa_0'),
  addVisaApplicationModal: (page) => page.getByRole('heading', { name: 'Add visa application' }),
  mainApplicantVisaApplicationsCount: (page) =>
    page.locator('#vis_0 .info-vr').filter({ hasText: 'VISA Applications' }).locator('.info-name'),

  visaCountryDropdown: (page) => page.locator('#select2-ddl_vis_countryV2-container'),
  visaTypeDropdown: (page) => page.locator('#select2-ddl_vis_typeV2-container'),
  visaApplicationDateInput: (page) => page.locator('#vis_app_dateV2'),
  visaDecisionDateInput: (page) => page.locator('#vis_decision_dateV2'),
  visaOutcomeDropdown: (page) => page.locator('#select2-ddl_vis_outcomV2-container'),
  // Only rendered once Application Outcome is "Granted".
  visaGrantNumberInput: (page) => page.locator('#txt_vis_grantNumber'),
  visaValidityStartDateInput: (page) => page.locator('#txt_vis_his_start_date'),
  visaValidityEndDateInput: (page) => page.locator('#txt_vis_his_end_date'),
  visaApplicationDoneButton: (page) => page.locator('button[onclick="SaveVisHisDetails();"]'),

  // ---------- Countries visited card & Add details ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "List all countries you have visited" section).
  countriesVisitedCardHeading: (page) => page.locator('#tileContainer').getByText('Countries visited', { exact: true }),
  addcountriesvisitedButton: (page) => page.locator('a.clsmanage[onclick*="InitTravel"]'),
  hasVisitedCountriesYesLabel: (page) => page.locator('label[for="eduVistedCntY"]'),
  hasVisitedCountriesNoLabel: (page) => page.locator('label[for="eduVistedCntN"]'),

  // Main applicant's slot always renders first inside this container; family members follow it.
  addCountryVisitedDetailsButton: (page) => page.locator('button[onclick="GetTravelHistoryById(this,0);"]'),
  addCountryVisitedModal: (page) => page.getByRole('heading', { name: 'Add Countries visited' }),
  mainApplicantCountriesVisitedCard: (page) => page.locator('#divCountriesVisitDetails .card').first(),

  visitedCountryDropdown: (page) => page.locator('#select2-ddlTrvHisCountry-container'),
  arrivalDateInput: (page) => page.locator('#txtArrivalDate'),
  departureDateInput: (page) => page.locator('#txtDepartDate'),
  saveCountryVisitedButton: (page) => page.locator('#btnSaveTravel'),

  // ---------- Finances card & Add Sponsor ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "List all the accessible funds..." section).
  financesCardHeading: (page) => page.locator('#tileContainer').getByText('Finances', { exact: true }),
  addfinancesButton: (page) => page.locator('a.clsmanage[onclick*="InitSponsor"]'),

  weeklyIncomeInput: (page) => page.locator('#txtWeekIncome'),
  financialSupportYesLabel: (page) => page.locator('label[for="staySupportYes"]'),
  financialSupportNoLabel: (page) => page.locator('label[for="staySupportNo"]'),
  // Only rendered once "Yes" is selected for financial support.
  supportDetailsTextarea: (page) => page.locator('#txtProvdDtl'),
  saveFinanceQuestionsButton: (page) => page.locator('a[onclick="SaveSponsorAditnlQuesn();"]'),

  addSponsorButton: (page) => page.locator('a[onclick="showAddUpdateSponsorPopup(false);"]'),
  addSponsorModal: (page) => page.getByRole('heading', { name: 'Add Sponsor' }),
  sponsorRelationshipDropdown: (page) => page.locator('#select2-ddlRelationShip_Sponsor-container'),
  sponsorFirstNameInput: (page) => page.locator('#txtSponsorFirstName'),
  sponsorMiddleNameInput: (page) => page.locator('#txtSponsorMiddleName'),
  sponsorLastNameInput: (page) => page.locator('#txtSponsorLastName'),
  sponsorCountryDropdown: (page) => page.locator('#select2-ddlCountry_Sponsor-container'),
  // Toggling this reveals the income-details panel (currency + amount, this year/last year).
  sponsorAnnualIncomeToggleLabel: (page) => page.locator('label[for="sponserAnualIncome"]'),
  sponsorCYCurrencyDropdown: (page) => page.locator('#select2-ddlCountry_CYcurrency-container'),
  sponsorCYIncomeInput: (page) => page.locator('#txtIncomeCY'),
  sponsorLYCurrencyDropdown: (page) => page.locator('#select2-ddlCountry_LYcurrency-container'),
  sponsorLYIncomeInput: (page) => page.locator('#txtIncomeLY'),
  sponsorModalDoneButton: (page) => page.locator('button[onclick="addUpdateSponsor();"]'),
  // "Sponsors" is the bootstrap tab-pane id (href="#Sponsors" on the Sponsors-tab link).
  sponsorRow: (page, sponsorName) => page.locator('#Sponsors tr').filter({ hasText: sponsorName }),

  // ---------- OSHC card ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "Manage OSHC details" section).
  oshcCardHeading: (page) => page.locator('#tileContainer').getByText('OSHC', { exact: true }),
  addoshcButton: (page) => page.locator('a.clsmanage[onclick*="InitOshcProfile"]'),
  hasOshcYesLabel: (page) => page.locator('label[for="chkOshcYes"]'),
  hasOshcNoLabel: (page) => page.locator('label[for="chkOshcNo"]'),
  awareOshcRequirementYesLabel: (page) => page.locator('label[for="chkHealthOshcYes"]'),
  awareOshcRequirementNoLabel: (page) => page.locator('label[for="chkHealthOshcNo"]'),
  saveOshcButton: (page) => page.locator('#btnOshcSave'),

  // ---------- Resume card ----------
  // Verified against the real DOM (StudentTileDetails.aspx, "Manage resume" section).
  resumeCardHeading: (page) => page.locator('#tileContainer').getByText('Resume', { exact: true }),
  addresumeButton: (page) => page.locator('a.clsmanage[onclick*="InitResumeProfile"]'),
  // Main applicant's slot always renders first; family members' rows follow it.
  attachResumeButton: (page) => page.getByRole('button', { name: 'Attach resume' }).first(),
  mainApplicantResumeFileDisplay: (page) => page.locator('#fileDisplay_0'),

  // ---------- Test evidences modal ----------
  testEvidenceModal: (page) =>
    page.locator('div.modal, [role="dialog"]').filter({ has: page.getByRole('heading', { name: /^Test evidences/ }) }),
  testEvidenceFileInput: (page) => studentAddressLocators.testEvidenceModal(page).locator('input[type="file"]'),
  testEvidenceDoneButton: (page) => studentAddressLocators.testEvidenceModal(page).getByRole('button', { name: 'Done', exact: true }),
  testEvidenceCancelButton: (page) => studentAddressLocators.testEvidenceModal(page).getByRole('button', { name: 'Cancel', exact: true }),

};

module.exports = studentAddressLocators;
