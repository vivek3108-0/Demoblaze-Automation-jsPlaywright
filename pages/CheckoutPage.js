class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.nameInput = "#name";
    this.countryInput = "#country";
    this.cityInput = "#city";
    this.cardInput = "#card";
    this.monthInput = "#month";
    this.yearInput = "#year";
    this.purchaseButton = 'button[onclick="purchaseOrder()"]';
  }

  async fillOrderForm(orderData) {
    await this.page.fill(this.nameInput, orderData.name);
    await this.page.fill(this.countryInput, orderData.country);
    await this.page.fill(this.cityInput, orderData.city);
    await this.page.fill(this.cardInput, orderData.creditCard);
    await this.page.fill(this.monthInput, orderData.month);
    await this.page.fill(this.yearInput, orderData.year);
  }

  async purchase() {
    await this.page.click(this.purchaseButton);
  }
}

module.exports = CheckoutPage;
