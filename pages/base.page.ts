import { Page } from "@playwright/test";

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 30000 });
  }

  convertUrl(input: string): string {
    const match = input.match(/\[(.*?)\]\s*(.*)/);
    if (!match) return "";

    const author = match[1];
    const title = match[2];

    const full = `${author} ${title}`;
    return full
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
}
