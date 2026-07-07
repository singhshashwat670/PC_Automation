const loginLocators = require('./locators/login.locator');
const WaitUtil = require('../utils/waitUtil');
const logger = require('../utils/logger');


class LoginPage {
  constructor(page,envConfig) {
    this.page = page;
    this.envConfig = envConfig;
  }

  async navigateToLogin() {
    logger.info('Navigating to login page');
    await this.page.goto(this.envConfig.baseURL);
    await WaitUtil.waitForPageLoad(this.page);
  }

  async login(username, password) {
    logger.info(`Logging in with user: ${username}`);

    await WaitUtil.fill(loginLocators.usernameInput(this.page), username);
    await WaitUtil.click(loginLocators.nextButton(this.page));

    await WaitUtil.fill(loginLocators.passwordInput(this.page), password);

    // If your application shows "Next" again after password
    await WaitUtil.click(loginLocators.nextButton(this.page));

    // OR if app uses sign in/login button, use below instead:
    // await WaitUtil.click(loginLocators.loginButton(this.page));

    await WaitUtil.waitForPageLoad(this.page);
  }
}

module.exports = LoginPage;