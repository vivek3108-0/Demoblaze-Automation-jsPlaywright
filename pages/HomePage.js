class HomePage {
  constructor(page) {
    this.page = page;
    this.loginLink = "#login2";
    this.cartLink = "#cartur";
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickLogin() {
    await this.page.click(this.loginLink);
  }

  async clickCart() {
    await this.page.click(this.cartLink);
  }

  async selectProduct(productName) {
    await this.page.click(`text=${productName}`);
  }
}

module.exports = HomePage;
