import { test, expect } from "@playwright/test";
import dataDev from "./data/data-dev.json";
import dataProd from "./data/data-prod.json";
import { HomePage } from "../../page/home.page";

let data: any;
let homePage: HomePage;

test.describe("testcase màn home", () => {
  test.beforeEach(async ({ page }) => {
    data = process.env.ENV === "prod" ? dataProd : dataDev;
    homePage = new HomePage(page);
    await homePage.navigate(data.homePage.baseUrl);
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
    async ({ page }) => {
      await test.step("1. Kiểm tra title trang web", async () => {
        await expect(homePage.page).toHaveTitle(data.homePage.expected.title);
      });

      await test.step("2. Kiểm tra heading trang web", async () => {
        await expect(page.locator('xpath=//a[@rel="home"]')).toHaveText(
          data.homePage.expected.heading
        );
      });

      await test.step("3. Kiểm tra số lượng sản phẩm trang web", async () => {
        await expect(
          page.locator('xpath=//p[@class="woocommerce-result-count"]')
        ).toContainText(data.homePage.expected.quantity);
      });
    }
  );
});
