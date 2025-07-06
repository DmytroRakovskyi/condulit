import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class EditorPage extends BasePage {
  readonly articleTitle: Locator;
  readonly articleAbout: Locator;
  readonly articleTextArea: Locator;
  readonly articleFeedContent: Locator;
  readonly articleTextAreaContent: Locator;
  readonly userProfileButton: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = page.locator("input[placeholder*='Title']");
    this.articleAbout = page.locator("input[placeholder*='about']");
    this.articleTextArea = page.locator("textarea[placeholder*='your']");
    this.articleFeedContent = page.locator('.article-preview');
    this.articleTextAreaContent = page.locator("[class*='v-show-content s']");
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.publishButton = page.locator('button[data-qa-id="editor-publish"]');
  }

  async goToEditorPage() {
    await this.page.goto(`/editor`);
  }

  async fillArticle(title: string, about: string, text: string) {
    await this.articleTitle.fill(title);
    await this.articleAbout.fill(about);
    await this.articleTextArea.fill(text);
  }

  async publishArticle() {
    await this.publishButton.click();
  }

  async verifyArticleText(text: string) {
    await expect(this.articleTextAreaContent).toContainText(text);
  }
}
