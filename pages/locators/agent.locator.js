const agentLocators = {
  //agentTab: (page) => page.getByText('Agents').first(),
  //Amit
  agentTab: (page) => page.getByRole('link', { name: /Agents/i }),
  agent_Tab: (page) => page.locator('#Agents-tab'),
  agentsDropdown: (page) => page.locator('a[title="Agents"]').first(),
  easyCommissionOption: (page) => page.locator('a[title="Easy Commissions"]').first(),
  //easyCommissionOption: (page) => page.locator('span').filter({ hasText: 'Easy Commissions' }).first(),
  //easyCommissionOption: (page) => page.locator("span[data-i18n='nav.Agents_Easy_Commissions']"),
  settingsButton: (page) => page.locator('a[data-filter-tags="Agents Easy Commissions Settings"]').first(),
  filterButton: (page) =>  page.getByRole('link', { name: 'Filter' }),
  allocationSelectedText: (page) => page.locator('#select2-ddlAllocation-container'),
  allocationDropdown: (page) => page.locator('#select2-ddlAllocation-container').locator('xpath=ancestor::span[contains(@class,"select2-selection")]'),
  allocatepackageoption :(page) =>  page.locator('#select2-ddlAllocation-results').locator(':has-text("Allocated another package")'),
  doneButton: (page) =>  page.getByRole('button', { name: 'Done' }),
  allocatePackageButton: (page) => page.getByRole('button', { name: 'Allocate package' }),
  DateField: (page) => page.locator('#dtAplicbleFrom'),
  closePopupButton: (page) => page.getByRole('button', { name: /close|cancel|x/i }).first(),
  activeToggle: (page) => page.getByText(/^Active$/i).first(),
  yesOption: (page) => page.getByText(/^Yes$/i).first(),
  backButton: (page) => page.getByRole('button', { name: /back|go back/i }).first(),
  searchInput: (page) => page.locator('input[placeholder="Enter agent name, email or phone to search"]').first(),
  agentselect: (page) => page.locator('//label[@for="chkAllow_2"]'),
};

module.exports = agentLocators;