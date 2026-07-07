const dashboardLocators = {
  //dashboardHeader: (page) => page.getByText(/dashboard/i).first()
  //expect(page.getByText('Agents')).
  
 dashboardHeader: (page) => page.getByText('Agents').first()
 // dashboardHeader: (page) => page.locator('a[title="Agents"]').first()
};

module.exports = dashboardLocators;