const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const { orderData } = require("../utils/testData");

test.describe("Checkout Tests", () => {
  let homePage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await homePage.goto();
  });

  test("Place order with valid form", async ({ page }) => {
    await homePage.selectProduct("Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await productPage.addToCart();
    await page.waitForTimeout(1000);

    await homePage.clickCart();
    await page.waitForTimeout(2000);
    await cartPage.placeOrder();
    await page.waitForSelector("#name", { visible: true });

    await checkoutPage.fillOrderForm(orderData);
    await checkoutPage.purchase();
    await page.waitForTimeout(2000);
  });

  test("Attempt to place order with empty form", async ({ page }) => {
    await homePage.selectProduct("Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await productPage.addToCart();
    await page.waitForTimeout(1000);

    await homePage.clickCart();
    await page.waitForTimeout(2000);
    await cartPage.placeOrder();
    await page.waitForSelector("#name", { visible: true });

    await checkoutPage.purchase();
    await page.waitForTimeout(1000);
  });
});
