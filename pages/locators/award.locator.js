const awardLocators = {
  awardTab: (page) => page.getByText(/^Award$/i).first(),
  noOption: (page) => page.getByText(/^No$/i).first(),
  percentageOption: (page) => page.getByText(/^Percentage$/i).first(),
  yearInput: (page) => page.locator('input[name*="year"], input[placeholder*="Year"]').first(),
  saveButton: (page) => page.getByRole('button', { name: /^save$/i }).first()
};

module.exports = awardLocators;
``