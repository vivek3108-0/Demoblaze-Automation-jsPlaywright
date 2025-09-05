class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#loginusername";
    this.passwordInput = "#loginpassword";
    this.loginButton = 'button[onclick="logIn()"]';
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

module.exports = LoginPage;
