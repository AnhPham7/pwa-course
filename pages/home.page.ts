import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  baseUrl = process.env.BASE_URL || "";

  xpathTitle = "title";
  navigateHome = '//a[@rel="home"]';
  quantity = '//p[@class="woocommerce-result-count"]';
  inpSearch = '//input[@id="woocommerce-product-search-field-0"]';
  btnSearch = '//button[@value="Search"]';

  getXpathReviewProduct(review: string) {
    return `//div[@class='description']/p[text()='${review}']`;
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
  }

  async searchProduct(nameProduct: string) {
    await this.page.locator(this.inpSearch).fill(nameProduct);
    await this.page.locator(this.btnSearch).click();
  }
}
