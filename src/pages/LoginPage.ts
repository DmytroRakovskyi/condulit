import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LoginPage extends BasePage {
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly needAnAccount: Locator;
  readonly userProfileButton: Locator;
  readonly errorPanel: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("input[placeholder*='User']");
    this.emailInput = page.locator("input[placeholder*='Email']");
    this.passwordInput = page.locator("input[placeholder*='Password']");
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.needAnAccount = page.locator("//a[contains(text(), 'Need')]");
    this.errorPanel = page.locator('.error-messages');
    this.signInButton = page.locator('button.btn');
  }

  async userLogin(userEmail: string, userPassword: string) {
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click();
  }

  async goToLoginPage() {
    await this.page.goto(`/login`);
  }
}
