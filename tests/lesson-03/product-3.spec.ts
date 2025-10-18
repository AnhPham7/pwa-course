import { expect, test } from "@playwright/test";
import data from "./product.json";
import { HomePage } from "../../pages/home.page";

test.describe("Product", () => {
  let adminRequestContext: any;
  let productId: number;
  let dataInfoCaseConfig: any;
  let homePage: HomePage;
  let reviewIds: number[] = [];

  test.beforeEach(async ({ playwright, page }) => {
    const PRODUCT_003 = "PRODUCT_003";
    const env = process.env.ENV as "dev" | "prod";
    dataInfoCaseConfig = data[PRODUCT_003][env];
    homePage = new HomePage(page);
    const baseUrl = `${homePage.baseUrl}/wp-admin/post-new.php?post_type=product`;
    const token = process.env.TOKEN || "";

    adminRequestContext = await playwright.request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    await test.step("Create product", async () => {
      const urlCreateProduct = `${homePage.baseUrl}/wp-json/wc/v3/products`;
      const response = await adminRequestContext.post(urlCreateProduct, {
        data: {
          name: dataInfoCaseConfig.product.productName,
          type: dataInfoCaseConfig.product.type,
          regular_price: dataInfoCaseConfig.product.regularPrice,
          sale_price: dataInfoCaseConfig.product.salePrice,
        },
      });

      expect(response.status()).toEqual(201);
      const responseBody = await response.json();
      productId = responseBody.id;
    });
  });

  test.afterEach(async () => {
    await test.step("Delete product", async () => {
      const urlDeleteProduct = `${homePage.baseUrl}/wp-json/wc/v3/products/${productId}`;
      const response = await adminRequestContext.delete(urlDeleteProduct);
      expect(response.status()).toEqual(200);
    });
  });

  test(
    "Kiểm tra thông tin của product reviews",
    {
      tag: ["@PRODUCT_003", "@UI", "@PRODUCT_REVIEW"],
      annotation: {
        type: "Module ID",
        description: "PRODUCT",
      },
    },
    async ({ page }) => {
      await test.step("1. Thực hiện tạo 5 reviews cho sản phẩm thông qua API", async () => {
        for (let i = 0; i < 5; i++) {
          const urlCreateView = `${homePage.baseUrl}/wp-json/wc/v3/products/reviews`;
          const response = await adminRequestContext.post(urlCreateView, {
            data: {
              product_id: productId,
              review: `Quanhcm ${i}`,
              reviewer: `Reviewer ${i}`,
              reviewer_email: "quanh@gmail.com",
              rating: 5,
              status: "hold",
            },
          });

          expect(response.status).toEqual(201);
          const resBody = await response.json();
          expect(resBody.status).toBe("hold");
          reviewIds.push(resBody.id);
        }
      });

      await test.step("2. Di chuyển ra SF, tại product vừa thực hiện review verify trạng thái review", async () => {
        await homePage.navigateToHomePage();
        await homePage.searchProduct(dataInfoCaseConfig.product.productName);

        for (let i = 0; i < 5; i++) {
          const review = `Quanhcm ${i}`;
          const xpathReview = homePage.getXpathReviewProduct(review);

          expect(homePage.page.locator(xpathReview)).not.toBeVisible();
        }
      });

      await test.step("3. Truy cập trang admin review (Products -> Reviews), approve comments vừa tạo. Verify lại trạng thái review bên ngoài SF.", async () => {
        4;
        for (let i = 0; i < 5; i++) {
          const response = await adminRequestContext.post(
            `${homePage.baseUrl}/wp-json/wc/v3/products/reviews/${reviewIds[i]}`,
            {
              data: { status: "approved" },
            }
          );

          expect(response.status()).toEqual(200);
          const resBody = await response.json();
          expect(resBody.status).toBe("approved");
        }
      });
    }
  );
});
