// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test("Simple login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const usernameValid = process.env.USERNAME || "";
  const passwordValid = process.env.PASSWORD || "";

  await loginPage.navigate(process.env.BASE_URL || "");
  await loginPage.login(usernameValid, passwordValid);
  await expect(page.locator("body")).toContainText("Dashboard");
});
