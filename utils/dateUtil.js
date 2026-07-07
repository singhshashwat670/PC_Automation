/*class DateUtil {
  static getTodayDay() {
    return new Date().getDate().toString();
  }

  static async selectCurrentDate(page) {
    const todayDate = this.getTodayDay();

    const todayLocatorCandidates = [
      page.locator('[aria-current="date"]').first(),
      page.locator('.react-datepicker__day--today').first(),
      page.locator('.today').first(),
      page.getByRole('gridcell', { name: new RegExp(`^${todayDate}$`) }).first(),
      page.getByText(new RegExp(`^${todayDate}$`)).first()
    ];

    for (const locator of todayLocatorCandidates) {
      if (await locator.count()) {
        if (await locator.first().isVisible().catch(() => false)) {
          await locator.first().click();
          return;
        }
      }
    }

    throw new Error('Unable to select current date from calendar. Please update date selectors.');
  }
}

module.exports = DateUtil;
``
*/

/*class DateUtil {
  static getTodayFormatted() {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    // Format: dd-MM-yyyy
    return `${dd}-${mm}-${yyyy}`;
  }

  static async selectCurrentDate(page, locator) {
    const today = this.getTodayFormatted();

    // Fill the date field
    await locator.fill(today);
  }
}
  */
/* class DateUtil {
  static getTodayForDateInput() {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // Required format for input type="date"
    return `${yyyy}-${mm}-${dd}`;
  }

  static async selectCurrentDate(locator) {
    const today = this.getTodayForDateInput();

    //await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.fill(today);

    // Trigger JS/react/change validations if application depends on events
    await locator.dispatchEvent('input');
    await locator.dispatchEvent('change');
    await locator.blur();
  }
}

*/
class DateUtil {

  static getTodayForInput() {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;  // ✅ MUST for type="date"
  }

  static async selectCurrentDate(locator) {
    if (!locator || typeof locator.fill !== 'function') {
      throw new Error('Invalid locator passed to DateUtil.selectCurrentDate()');
    }

    const today = this.getTodayForInput();

    if (!today) {
      throw new Error('DateUtil returned undefined date');
    }

    await locator.waitFor({ state: 'visible', timeout: 10000 });

    await locator.fill(today);

    // ✅ Important for UI triggers
    await locator.dispatchEvent('input');
    await locator.dispatchEvent('change');
  }
}


module.exports = DateUtil;
``