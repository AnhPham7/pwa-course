import { expect } from "@playwright/test";
import { test } from "./fixture/index";
import dataDev from "./data/data-dev.json";
import dataProd from "./data/data-prod.json";

let data: any;

test.describe("Product Page", () => {
  test.beforeEach(async () => {
    data = process.env.ENV === "prod" ? dataProd : dataDev;
  });

  test.afterEach(async ({ productPage }) => {
    await productPage.clickEditProduct();
    await productPage.clickDelete();

    await expect(productPage.page.locator(productPage.message)).toContainText(
      data.productPage.expected.messDelete
    );
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
    async ({ productPage }) => {
      await test.step("1. Điền vào các thông tin của sản phẩm và bấm 'publish'", async () => {
        await productPage.fillTitle(data.productPage.data.nameProduct);
        await productPage.fillRegularPrice("100");
        await productPage.fillSalePrice("80");
        await productPage.clickEditCatalog();
        await productPage.selectCatalogSearchResultOnly();
        await productPage.clickPublish();

        await expect(
          productPage.page.locator(productPage.message)
        ).toContainText(data.productPage.expected.messPublish);
      });

      await test.step("2. Truy cập trang home và kiểm tra thông tin sản phẩm", async () => {
        await productPage.clickViewHome();

        await expect(
          productPage.page.locator(
            productPage.xpathHeadNameProduct(data.productPage.data.nameProduct)
          )
        ).not.toBeVisible();

        await productPage.searchProduct(data.productPage.data.nameProduct);

        await expect(
          productPage.page.locator(productPage.nameProd)
        ).toContainText(data.productPage.data.nameProduct);

        await expect(
          productPage.page.locator(productPage.regularPrice)
        ).toContainText(data.productPage.data.price.regularPrice);

        await expect(
          productPage.page.locator(productPage.salePrice)
        ).toContainText(data.productPage.data.price.salePrice);
      });
    }
  );
});
