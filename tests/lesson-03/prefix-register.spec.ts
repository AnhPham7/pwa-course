import { test, expect } from "@playwright/test";

test("register basic", async ({ page }) => {
  await page.goto("https://playwrightvn.com");

  await expect(page).toHaveTitle(/Playwright/);
});
