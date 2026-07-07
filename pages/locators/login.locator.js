/*const loginLocators = {
  usernameInput: (page) => page.locator('input[name="username"], input[type="email"], input[placeholder*="User"], input[placeholder*="Email"]').first(),
  nextButton: (page) => page.getByRole('button', { name: /next/i }).first(),
  passwordInput: (page) => page.locator('input[name="password"], input[type="password"]').first(),
  //loginButton: (page) => page.getByRole('button', { name: /login|sign in/i }).first(),
  nextButton: (page) => page.getByRole('button', { name: /next/i }).first(),
}
  */
 const loginLocators = {
  usernameInput: (page) =>
    page.locator('input[type="email"]').first(),

  nextButton: (page) =>
    page.getByRole('button', { name: /next/i }).first(),

  passwordInput: (page) =>
    page.locator('input[type="password"]').first(),

  loginButton: (page) =>
    page.getByRole('button', { name: /login|sign in/i }).first()
};

module.exports = loginLocators;