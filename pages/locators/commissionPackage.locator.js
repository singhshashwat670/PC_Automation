const commissionPackageLocators = {
 // managePackagesButton: (page) => page.locator('a[title="Manage packages"]').first(),
    managePackagesButton: (page) => page.getByRole('link', { name: /manage packages/i }).first(),
//commissionPackagesPageTitle: (page) => page.locator('a[title="Manage packages"]').first(),
 // commissionPackagesPageTitle: (page) => page.getByRole('link', { name: /manage packages/i }),
 commissionPackagesPageTitle: (page) => page.locator('#dvHeaderText'),

  addPackageButton: (page) => page.getByRole('button', { name: /add package/i }).first(),
  packageNameInput: (page) => page.locator('#txtPackageName').last(),
  descriptionInput: (page) => page.locator('#txtPackageDesc').last(),
 // dateField: (page) => page.locator('#txtEffectiveFrom').last(),
  dateField: (page) => page.locator('#txtEffectiveFrom'),
  doneButton: (page) => page.getByRole('button', { name: /^done$/i }).first(),
  searchInput: (page) => page.locator('input[type="search"]').first(),
arrowButton: (page) =>
    page.locator('#tblCommPackages tbody tr').first()
        .locator('i.fal.fa-chevron-right').nth(0),
 //coursesCheckbox: (page) => page.locator('#chk_Courses'),
  coursesCheckbox: (page) => page.locator('label[for="chk_Courses"]'),
  nonAwardCoursesCheckbox: (page) => page.locator('label[for="chk_Non_awardCourses"]'),
  packagedAwardsCheckbox: (page) => page.locator('label[for="chk_PackagedAwards"]'),
  unitsection: (page) => page.locator('label[for="rdo_addCommUnitsComplet_NO"]'),
  //visaTypeVariationYes: (page) => page.getByText(/^Yes$/i).first(),
  saveButton: (page) => page.getByRole('button', { name: /^save$/i }).first(),
  successMessage: (page) => page.locator('#ErrMsg').first(),
  closePopupButton: (page) => page.getByRole('button', { name: /^Close$/i }),
  commissionTypeDropdown: (page) => page.locator('select, [role="combobox"]').last(),
  percentageOption: (page) => page.getByText(/^Percentage$/i).first(),
  commissionValueInput: (page) => page.locator('input[name*="percentage"], input[name*="rate"], input[type="number"]').first(),
  yearInput: (page) => page.locator('input[name*="year"], input[placeholder*="Year"]').first(),
  closePopupButton: (page) => page.getByRole('button', { name: /close|cancel|x/i }).first(),
  backButton: (page) => page.getByRole('button', { name: /back|go back/i }).first(),
 // yesOption: (page) => page.getByText(/^Yes$/i).first(),
  agentSearchResultByName: (page, agentName) => page.getByText(new RegExp(agentName, 'i')).first(),
  //searchResultByPackageName: (page, packageName) => page.getByText(new RegExp(packageName, 'i')).first()

   
  packageStatus: (page) => page.locator('#divPackageStatus'),
  activeToggle: (page) => page.locator('#chkPkgActive').first(),
  activeLabel: (page) => page.locator('label[for="chkPkgActive"]'),
  confirmationPopup: (page) => page.locator('#modalCommConfirmation'),
  confirmationMessage: (page) => page.locator('#modalCommConfirmation .modal-body'),
  yesButton: (page) => page.getByRole('button', { name: /^Yes$/ }),

 
searchResultByPackageName: (page, packageName) =>
    page.locator('#tblCommPackages tbody tr')
        .filter({ hasText: packageName })
        .first()

};

module.exports = commissionPackageLocators;