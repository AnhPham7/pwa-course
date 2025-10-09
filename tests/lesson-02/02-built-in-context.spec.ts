import { expect } from "@playwright/test";
import { test } from "./fixture/index";
import dataDev from "./data/data-dev.json";
import dataProd from "./data/data-prod.json";
import { ProductPage } from "../../pages/product.page";

let data: any;

test.describe("Product Page", () => {
  test.beforeEach(async () => {
    data = process.env.ENV === "prod" ? dataProd : dataDev;
  });

  test.afterEach(async ({ newProductPage }) => {
    await newProductPage.clickEditProduct();
    await newProductPage.clickDelete();

    await expect(
      newProductPage.page.locator(newProductPage.message)
    ).toContainText(data.productPage.expected.messDelete);
  });

  test(
    "Tạo product thành công",
    {
      annotation: {
        type: "MODULE_ID",
        description: "PRODUCT",
      },
      tag: ["@PRODUCT_001", "@PRODUCT"],
    },
    async ({ productPage, newProductPage, page }) => {
      await test.step("1. Điền vào các thông tin của sản phẩm và bấm 'publish'", async () => {
        await productPage.fillTitle(data.productPage.data.nameProduct);
        await productPage.fillRegularPrice(
          data.productPage.data.price.regularPrice
        );
        await productPage.fillSalePrice(data.productPage.data.price.salePrice);
        await productPage.clickPublish();

        await expect(
          productPage.page.locator(productPage.message)
        ).toContainText(data.productPage.expected.messPublish);
      });

      await test.step("2. Truy cập trang home và kiểm tra thông tin sản phẩm", async () => {
        const currentUrl = page.url();
        await newProductPage.navigate(currentUrl);
        await newProductPage.clickViewProduct();

        await expect(
          newProductPage.page.locator(newProductPage.nameProd)
        ).toContainText(data.productPage.data.nameProduct);

        await expect(
          newProductPage.page.locator(newProductPage.regularPrice)
        ).toContainText(data.productPage.data.price.regularPrice);

        await expect(
          newProductPage.page.locator(newProductPage.salePrice)
        ).toContainText(data.productPage.data.price.salePrice);
      });
    }
  );
});
