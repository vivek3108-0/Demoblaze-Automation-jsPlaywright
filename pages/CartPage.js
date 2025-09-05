class CartPage {
  constructor(page) {
    this.page = page;
    this.placeOrderButton = 'button[data-target="#orderModal"]';
    this.deleteButtons = 'a[onclick*="deleteItem"]';
  }

  async placeOrder() {
    await this.page.click(this.placeOrderButton);
  }

  async deleteItem() {
    await this.page.click(this.deleteButtons);
  }
}

module.exports = CartPage;
