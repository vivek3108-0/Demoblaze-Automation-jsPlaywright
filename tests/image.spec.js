const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");

test.describe("Image Validation Tests", () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForSelector(".card", { visible: true });
  });

  test("Validate no broken product images", async ({ page }) => {
    await page.waitForSelector(".card-img-top", {
      visible: true,
      timeout: 15000,
    });

    const images = await page.locator(".card-img-top").all();

    for (const image of images) {
      const src = await image.getAttribute("src");
      expect(src).toBeTruthy();
      expect(src).not.toBe("");
      expect(src).toContain(".jpg");
    }

    expect(images.length).toBeGreaterThan(0);
  });

  test("Product images are visible", async ({ page }) => {
    await page.waitForSelector(".card-img-top", {
      visible: true,
      timeout: 15000,
    });

    const images = await page.locator(".card-img-top").all();

    for (let i = 0; i < Math.min(3, images.length); i++) {
      await expect(images[i]).toBeVisible();
    }

    expect(images.length).toBeGreaterThan(0);
  });

  test("All product cards have images", async ({ page }) => {
    await page.waitForSelector(".card", { visible: true });

    const cards = await page.locator(".card").all();
    const images = await page.locator(".card-img-top").all();

    expect(images.length).toBe(cards.length);
  });
});
