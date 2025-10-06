import { test, expect } from "@playwright/test";
import dataDev from "./data/data-dev.json";
import dataProd from "./data/data-prod.json";
import { LoginPage } from "../../page/login.page";

let data: any;
let loginPage: LoginPage;

test.describe("testcase màn Dashboard - Login", () => {
  test.beforeEach(async ({ page }) => {
    data = process.env.ENV === "prod" ? dataProd : dataDev;
    loginPage = new LoginPage(page);
    await loginPage.navigate(data.login_page.baseUrl);
  });

  test(
    "Login thanh cong",
    {
      annotation: {
        type: "MODULE_ID",
        description: "DB_AUTH_001",
      },
      tag: ["@UI", "@SMOKE"],
    },
    async () => {
      await test.step("fill and submit", async () => {
        await loginPage.login(
          process.env.USERNAME_DEV || "",
          process.env.PASSWORD_DEV || ""
        );
      });

      await expect(loginPage.page.locator(loginPage.dashboard)).toContainText(
        data.login_page.expected.heading
      );
    }
  );

  test(
    "Login that bai",
    {
      annotation: {
        type: "MODULE_ID",
        description: "DB_AUTH_001",
      },
      tag: ["@UI"],
    },
    async () => {
      await test.step("fill and submit", async () => {
        await loginPage.login(
          data.login_page.data.username_invalid,
          data.login_page.data.password_invalid
        );
      });

      await expect(loginPage.page.locator(loginPage.errMess)).toContainText(
        `Error: The username ${data.login_page.data.username_invalid} is not registered on this site. If you are unsure of your username, try your email address instead.`
      );
    }
  );
});
