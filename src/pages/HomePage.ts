import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class HomePage extends BasePage {
  readonly myFeedButton: Locator;
  readonly globalFeedButton: Locator;
  readonly tagList: Locator;
  readonly articlePreview: Locator;
  readonly articleFavorite: Locator;
  readonly settingsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.settingsButton = page.locator("a[href*='settings']");
    this.myFeedButton = page.locator("a[href*='my-feed']");
    this.globalFeedButton = page.locator("//a[contains(text(), 'Global Feed')]");
    this.tagList = page.locator('.sidebar .tag-list');
    this.articlePreview = page.locator('.article-preview');
    this.articleFavorite = page.locator('button[data-qa-type*="fav"]');
  }

  async goToHomePage(url?: string) {
    await this.page.goto('/');
  }

  async getByTag(tagName: string) {
    return this.page.locator(`a[href="/tag/${tagName}"]`);
  }
  async getByList(text: string) {
    return this.page.locator(`//li[span[text()='${text}']]`);
  }
}
