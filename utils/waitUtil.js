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

  // The app shows a jQuery UI dialog with a ".ui-widget-overlay" backdrop
  // during page/ajax transitions; it intercepts pointer events on anything
  // underneath until it closes, so menu interactions must wait it out first.
  static async waitForOverlayToClear(page, timeout = 15000) {
    await page.locator('.ui-widget-overlay').waitFor({ state: 'hidden', timeout });
  }

  // Some triggers (e.g. "add new address") don't reliably open their target on the
  // first click - retries the click until the target becomes visible instead of
  // failing on a single missed click.
  static async clickUntilVisible(clickLocator, waitLocator, { timeout = 12000, retries = 3 } = {}) {
    const perAttemptTimeout = Math.floor(timeout / retries);
    for (let attempt = 1; attempt <= retries; attempt++) {
      await clickLocator.click();
      try {
        await waitLocator.waitFor({ state: 'visible', timeout: perAttemptTimeout });
        return;
      } catch (err) {
        if (attempt === retries) throw err;
      }
    }
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