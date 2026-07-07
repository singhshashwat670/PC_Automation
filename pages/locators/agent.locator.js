const agentLocators = {
  //agentTab: (page) => page.getByText('Agents').first(),
  agentTab: (page) => page.getByRole('link', { name: /Agents/i }),
  agentsDropdown: (page) => page.locator('a[title="Agents"]').first(),
  easyCommissionOption: (page) => page.locator('a[title="Easy Commissions"]').first(),
  //easyCommissionOption: (page) => page.locator('span').filter({ hasText: 'Easy Commissions' }).first(),
  //easyCommissionOption: (page) => page.locator("span[data-i18n='nav.Agents_Easy_Commissions']"),
  settingsButton: (page) => page.locator('a[data-filter-tags="Agents Easy Commissions Settings"]').first(),
  filterButton: (page) => page.getByRole('button', { name: /filter/i }).first(),
  allocationDropdown: (page) => page.locator('select, [role="combobox"]').nth(1),
  doneButton: (page) => page.getByRole('button', { name: /^done$/i }).first(),
  allocatePackageButton: (page) => page.getByRole('button', { name: /allocate package/i }).first(),
  closePopupButton: (page) => page.getByRole('button', { name: /close|cancel|x/i }).first(),
  activeToggle: (page) => page.getByText(/^Active$/i).first(),
  yesOption: (page) => page.getByText(/^Yes$/i).first(),
  backButton: (page) => page.getByRole('button', { name: /back|go back/i }).first(),
  searchInput: (page) => page.locator('input[placeholder*="Search"], input[type="search"]').first()
};

module.exports = agentLocators;