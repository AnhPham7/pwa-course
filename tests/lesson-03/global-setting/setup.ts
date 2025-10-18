import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";

test(
  "Setup",
  {
    tag: ["@SETUP"],
  },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME || "";
    const password = process.env.PASSWORD || "";
    await loginPage.navigate(process.env.BASE_URL || "");
    await loginPage.login(username, password);

    await expect(page.locator("body")).toContainText("Dashboard");

    await page.context().storageState({ path: ".playwright/auth.json" });
  }
);
