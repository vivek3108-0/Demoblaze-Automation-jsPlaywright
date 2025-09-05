class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = 'a[onclick*="addToCart"]';
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }
}

module.exports = ProductPage;
