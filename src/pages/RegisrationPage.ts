import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
export class RegistrationPage extends BasePage {
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly userProfileButton: Locator;
  readonly errorPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("input[placeholder*='User']");
    this.emailInput = page.locator("input[placeholder*='Email']");
    this.passwordInput = page.locator("input[placeholder*='Password']");
    this.signInButton = page.locator('button.btn');
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.errorPanel = page.locator('.error-messages');
  }

  async goToRegisterPage(url: string = '/register') {
    await this.page.goto(url);
  }

  async userRegistration(userName: string, userEmail: string, userPassword: string) {
    await this.userNameInput.fill(userName);
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click();
  }
}
