const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const CartPage = require("../pages/CartPage");
const ProductPage = require("../pages/ProductPage");

test.describe("Modal Tests", () => {
  let homePage;
  let cartPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);
    await homePage.goto();
    await page.waitForSelector(".card", { visible: true });
  });

  test("Place order modal opens and closes", async ({ page }) => {
    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(1000);

    await page.goto("/cart.html");

    try {
      await page.waitForSelector("#tbodyid", { visible: true, timeout: 5000 });
    } catch {
      await page.waitForSelector(".cart_item", {
        visible: true,
        timeout: 5000,
      });
    }

    await page.click('button[data-target="#orderModal"]');
    await page.waitForSelector("#orderModal", { visible: true });

    const modal = page.locator("#orderModal");
    await expect(modal).toBeVisible();

    await page.click("#orderModal .close");
    await page.waitForTimeout(1000);
  });

  test("Login modal opens and closes", async ({ page }) => {
    await page.click("#login2");
    await page.waitForSelector("#logInModal", { visible: true });

    const modal = page.locator("#logInModal");
    await expect(modal).toBeVisible();

    // Better close button selector
    await page.click("#logInModal .close");
    await page.waitForTimeout(1000);
  });
});
