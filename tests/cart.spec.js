const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");

test.describe("Cart Tests", () => {
  let homePage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
    await page.waitForSelector(".card-title", { visible: true });
  });

  test("Add single product to cart", async ({ page }) => {
    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(500);
  });

  test("Remove product from cart", async ({ page }) => {
    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(500);

    await page.goto("/cart.html");
    await page.waitForSelector("#tbodyid", { visible: true });

    const deleteButton = page.locator('a[onclick*="deleteItem"]').first();
    if (await deleteButton.isVisible()) {
      await deleteButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("Add multiple products to cart", async ({ page }) => {
    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(500);

    await page.goto("/");
    await page.waitForSelector(".card-title", { visible: true });

    await page.click("text=Nokia lumia 1520");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(500);
  });

  test("Add to cart as logged-in user", async ({ page }) => {
    await page.click("#login2");
    await page.waitForSelector("#loginusername", { visible: true });
    await page.fill("#loginusername", "testuser");
    await page.fill("#loginpassword", "testpass");
    await page.click('button[onclick="logIn()"]');
    await page.waitForTimeout(1000);

    const modal = page.locator("#logInModal");
    if (await modal.isVisible()) {
      await page.click('#logInModal button[data-dismiss="modal"]');
      await page.waitForTimeout(500);
    }

    await page.goto("/");
    await page.waitForSelector(".card-title", { visible: true });

    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    page.on("dialog", (dialog) => dialog.accept());
    await page.click('a[onclick*="addToCart"]');
    await page.waitForTimeout(500);
  });
});
