import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import dataDev from "../data/data-dev.json";
import dataProd from "../data/data-prod.json";

let data: any;

const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    data = process.env.ENV === "prod" ? dataProd : dataDev;
    await loginPage.navigate(data.productPage.baseUrl);
    await loginPage.login(
      process.env.USERNAME_DEV || "",
      process.env.PASSWORD_DEV || ""
    );
    await expect(loginPage.page.locator(loginPage.dashboard)).toContainText(
      data.productPage.expected.heading
    );
    await use(loginPage);
  },
});
export { test };
