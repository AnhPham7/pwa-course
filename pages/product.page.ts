import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  inpTitle = '//input[@id="title"]';
  inpRegularPrice = '//input[@id="_regular_price"]';
  inpSalePrice = '//input[@id="_sale_price"]';
  btnPublish = '//input[@id="publish"]';
  btnDelete = '//div[@id="delete-action"]';
  message = '(//div[@id="message"])[1]//p';
  btnViewProduct = '//li[@id="wp-admin-bar-view"]';
  btnViewHome = '//li[@id="wp-admin-bar-site-name"]';
  btnEditProduct = '//li[@id="wp-admin-bar-edit"]';
  inpSearch = '//input[@id="woocommerce-product-search-field-0"]';
  btnSearch = '//button[@value="Search"]';
  nameProd = '//h1[@class="product_title entry-title"]';
  regularPrice =
    '(//div[@class="summary entry-summary"]//span[@class="woocommerce-Price-amount amount"]//bdi)[1]';
  salePrice =
    '(//div[@class="summary entry-summary"]//span[@class="woocommerce-Price-amount amount"]//bdi)[2]';
  btnEditCatalog =
    '//div[@id="catalog-visibility"]//a[@href="#catalog-visibility"]';
  radioCatalogSearchResultOnly = '//label[@for="_visibility_search"]';
  divProduct = '//div[contains(@id, "product-")]';

  xpathHeadNameProduct(nameProduct: string) {
    return `//h2[@class="woocommerce-loop-product__title" and contains(text(), "${nameProduct}")]`;
  }

  async clickEditCatalog() {
    await this.page.locator(this.btnEditCatalog).click();
  }

  async selectCatalogSearchResultOnly() {
    await this.page.locator(this.radioCatalogSearchResultOnly).click();
  }

  async clickViewProduct() {
    await this.page.locator(this.btnViewProduct).click();
  }

  async clickViewHome() {
    await this.page.locator(this.btnViewHome).click();
  }

  async clickEditProduct() {
    await this.page.locator(this.btnEditProduct).click();
  }

  async searchProduct(nameProduct: string) {
    await this.page.locator(this.inpSearch).fill(nameProduct);
    await this.page.locator(this.btnSearch).click();
  }

  async fillTitle(title: string) {
    await this.page.locator(this.inpTitle).fill(title);
  }

  async fillRegularPrice(price: string) {
    await this.page.locator(this.inpRegularPrice).fill(price);
  }

  async fillSalePrice(price: string) {
    await this.page.locator(this.inpSalePrice).fill(price);
  }

  async clickPublish() {
    await this.page.locator(this.btnPublish).click();
  }

  async clickDelete() {
    await this.page.locator(this.btnDelete).click();
  }
}
