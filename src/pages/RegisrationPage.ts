import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
export class RegistrationPage extends BasePage {
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly userProfileButton: Locator;
  readonly logOutButton: Locator;
  readonly errorPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("input[placeholder*='User']");
    this.emailInput = page.locator("input[placeholder*='Email']");
    this.passwordInput = page.locator("input[placeholder*='Password']");
    this.signInButton = page.locator('button.btn');
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.logOutButton = page.locator("button[class*='danger']");
    this.errorPanel = page.locator('.error-messages');
  }

  async goToRegisterPage() {
    await this.page.goto(`/register`);
  }

  private async goToSettingsPage() {
    await this.page.goto(`/settings`);
  }

  async userRegistration(userName: string, userEmail: string, userPassword: string) {
    await this.userNameInput.fill(userName);
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click();
  }
  async userLogout() {
    await this.goToSettingsPage();
    await this.logOutButton.click();
    await expect(this.page).toHaveURL(`/`);
  }
}
