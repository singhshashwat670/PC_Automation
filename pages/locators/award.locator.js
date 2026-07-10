const awardLocators = {
  //awardTab: (page) => page.getByText(/^Award$/i).first(),
   awardTab: (page) => page.getByText(/^Awards$/i).first(),
  YesOption: (page) => page.locator('label[for="rbCommRateVaryAwardYes"]'),
 // awardgroup: (page) => page.getByText('Add award group').first(),
  awardgroup: (page) => page.getByRole('link', { name: 'Add award group' }),
  modalTitle: (page) => page.locator('#hAddAwardGroup'),
  groupname: (page) => page.locator('#txtPopAwardGroupName'),
  awardselect: (page) => page.locator('#chkAward_212'),
  //awardselect: (page) => page.locator('#chkAward_212').locator('xpath=ancestor::div[contains(@class,"custom-checkbox")]'),
  crvary: (page) => page.locator('#ByCountry4'),
  doneButton: (page) => page.getByRole('button', { name: /^Done$/i }).first(),
  //awardarrowButton: (page, groupname) => page.locator('//tr[td[contains(., "${groupname}")]]//td[3]//i'),
  
/*awardarrowButton: (page, groupname) =>
    page.locator('tr')
        .filter({ hasText: groupname })
        .locator('i.fa-chevron-right'),
        */
       awardarrowButton: (page, groupname) =>
    page.locator('tr')
        .filter({ hasText: groupname })
        .getByRole('link', { name: 'View Details' }),

  noOption: (page) => page.getByText(/^No$/i).first(),
  commissionTypeDropdown: (page) => page.locator('#select2-ddlGrpSetRateTypeDynamic-container'),
  percentageOption: (page) => page.locator('li').filter({ hasText: '%' }),
  percentageinput: (page) => page.locator('#txtRateValueDynamic'),
  yearInput: (page) => page.locator("#txtGrpSetRateTermFrmDynamic"),
  
// Visible selected text of Commission Rate Type dropdown
  rateTypeSelectedText: (page) => page.locator('#select2-ddlRatesTypeDynamic-container'),

  // Clickable Select2 dropdown box
  rateTypeDropdown: (page) => page.locator('#select2-ddlRatesTypeDynamic-container').locator('xpath=ancestor::span[contains(@class,"select2-selection")]'),

  // Dropdown results list
  rateTypeResults: (page) =>page.locator('#select2-ddlRatesTypeDynamic-results'),

  // Year(s) option inside opened dropdown
  yearOption: (page) => page.locator('#select2-ddlRatesTypeDynamic-results').getByRole('option', { name: /^Year\(s\)$/ }),

  // Hidden real select element
  rateTypeHiddenSelect: (page) =>page.locator('#ddlRatesTypeDynamic'),
  //crdropdown: (page) => page.getByTitle('Full course fee'),
  //ratetypedropdown: (page) => page.locator('select[id="ddlRatesTypeDynamic"]'),

  //saveButton: (page) =>  page.getByRole('button', { name: 'Save' }),
  SaveButton: (page) =>  page.locator("//button[@onclick='SavePackageGroupSetting()']"),
  SaveawardButton: (page) =>   page.locator('a').filter({ hasText: 'Save' }).first(),
  gobackButton: (page) =>  page.locator('#BtnGoBack'),
   successMessage: (page) => page.locator('#ErrMsg').first(),
  closePopupButton: (page) => page.getByRole('button', { name: /^Close$/i }),
};

module.exports = awardLocators;
