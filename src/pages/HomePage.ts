import { Page, Locator, test } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly myFeedButton: Locator;
  readonly globalFeedButton: Locator;
  readonly tagList: Locator;
  readonly articlePreview: Locator;
  readonly articleFavorite: Locator;
  readonly settingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = page.locator("a[href*='settings']");
    this.myFeedButton = page.locator("a[href*='my-feed']");
    this.globalFeedButton = page.locator("//a[contains(text(), 'Global Feed')]");
    this.tagList = page.locator('.sidebar .tag-list');
    this.articlePreview = page.locator('.article-preview');
    this.articleFavorite = page.locator('button[data-qa-type*="fav"]');
  }
  async getByTag(tagName: string) {
    return this.page.locator(`a[href="/tag/${tagName}"]`);
  }
  async getByList(text: string) {
    return this.page.locator(`//li[span[text()='${text}']]`);
  }
}
