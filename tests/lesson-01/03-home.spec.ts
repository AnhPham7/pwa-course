import { test, expect } from "@playwright/test";
import dataDev from "./data/data-dev.json";
import dataProd from "./data/data-prod.json";
import { HomePage } from "../../page/home.page";

let data: any;
let homePage: HomePage;

test.describe("testcase màn home", () => {
  test.beforeEach(async ({ page }) => {
    data = process.env.ENV === "prod" ? dataProd : dataDev;
    const url =
      process.env.ENV === "prod"
        ? process.env.BASE_URL_DEV
        : process.env.BASE_URL_PROD;
    homePage = new HomePage(page);
    await homePage.navigate(url || "");
  });

  test(
    "HOME_001",
    {
      annotation: {
        type: "MODULE_ID",
        description: "HOME",
      },
      tag: ["@UI"],
    },
    async () => {
      await test.step("1. Kiểm tra title trang web", async () => {
        await expect(homePage.page).toHaveTitle(data.homePage.expected.title);
      });

      await test.step("2. Kiểm tra heading trang web", async () => {
        await expect(homePage.page.locator(homePage.navigateHome)).toHaveText(
          data.homePage.expected.heading
        );
      });

      await test.step("3. Kiểm tra số lượng sản phẩm trang web", async () => {
        await expect(homePage.page.locator(homePage.quantity)).toContainText(
          data.homePage.expected.quantity
        );
      });
    }
  );
});
