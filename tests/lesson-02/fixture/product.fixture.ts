import { test as base, expect } from "@playwright/test";
import { ProductPage } from "../../../pages/product.page";

const test = base.extend<{
  productPage: ProductPage;
  newProductPage: ProductPage;
  newBrowserPage: ProductPage;
}>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    // await productPage.navigate(data.productPage.baseUrl);
    await use(productPage);
  },

  newProductPage: async ({ context }, use) => {
    const newPage = await context.newPage();
    const newProductPage = new ProductPage(newPage);
    await use(newProductPage);
  },

  newBrowserPage: async ({ browser, page }, use) => {
    const authState = await page.context().storageState();
    const newContext = await browser.newContext({ storageState: authState });
    const newBrowserPage = new ProductPage(await newContext.newPage());
    await use(newBrowserPage);
  },
});

export { test };
