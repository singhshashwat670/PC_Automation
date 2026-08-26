class WaitUtil {
  static async waitForPageLoad(page) {
    await page.waitForLoadState('domcontentloaded');
  }

  static async click(locator, timeout = 12000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }
   static async fill(locator, value, timeout = 12000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
  }

  static async waitForVisible(locator, timeout = 12000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
    

  static async waitForHidden(locator, timeout = 12000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }


  

 /* static async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

*/
  static async selectByVisibleText(dropdownLocator, visibleText) {
    await dropdownLocator.waitFor({ state: 'visible', timeout: 12000 });
    await dropdownLocator.selectOption({ label: visibleText });
  }

}


module.exports = WaitUtil;