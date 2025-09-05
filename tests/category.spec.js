const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");

test.describe("Category Filter Tests", () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("Category filter working", async ({ page }) => {
    await page.click("text=Phones");
    await page.waitForTimeout(2000);

    const products = await page.locator(".card-title").allTextContents();
    expect(products.length).toBeGreaterThan(0);
  });

  test("Laptops category filter", async ({ page }) => {
    await page.click("text=Laptops");
    await page.waitForTimeout(2000);

    const products = await page.locator(".card-title").allTextContents();
    expect(products.length).toBeGreaterThan(0);
  });

  test("Monitors category filter", async ({ page }) => {
    await page.click("text=Monitors");
    await page.waitForTimeout(2000);

    const products = await page.locator(".card-title").allTextContents();
    expect(products.length).toBeGreaterThan(0);
  });
});
