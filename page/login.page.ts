import { BasePage } from "./base.page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  username = '//input[@id="user_login"]';
  password = '//input[@id="user_pass"]';
  btnLogin = '//input[@id="wp-submit"]';
  dashboard = '//li[@id="menu-dashboard"]//div[@class="wp-menu-name"]';
  errMess = '//div[@id="login_error"]//p';

  async login(username: string, password: string) {
    await this.page.locator(this.username).fill(username);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.btnLogin).click();
  }
}
