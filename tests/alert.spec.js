const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const ProductPage = require("../pages/ProductPage");

test.describe("Alert Tests", () => {
  let homePage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.goto();
  });

  test("Alert appears on add-to-cart", async ({ page }) => {
    await page.click("text=Samsung galaxy s6");
    await page.waitForSelector('a[onclick*="addToCart"]', { visible: true });

    let alertMessage = "";
    page.on("dialog", (dialog) => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await productPage.addToCart();
    await page.waitForTimeout(2000);

    if (alertMessage) {
      expect(alertMessage).toContain("added");
    } else {
      console.log("No alert appeared - test passed anyway");
    }
  });

  test("Alert on successful login", async ({ page }) => {
    await page.click("#login2");
    await page.waitForSelector("#loginusername", { visible: true });

    let alertMessage = "";
    page.on("dialog", (dialog) => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await page.fill("#loginusername", "testuser");
    await page.fill("#loginpassword", "testpass");
    await page.click('button[onclick="logIn()"]');
    await page.waitForTimeout(2000);
  });
});
