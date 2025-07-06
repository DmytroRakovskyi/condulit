import { Page, Locator } from '@playwright/test';
import { UserData } from '../types/user';
import { BasePage } from '../pages/BasePage';

export class SettingsPage extends BasePage {
  readonly urlPictureInput: Locator;
  readonly userNameInput: Locator;
  readonly bioInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly updateSettingsButton: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPictureInput = this.page.getByPlaceholder('URL');
    this.userNameInput = this.page.getByPlaceholder('Your username');
    this.bioInput = this.page.getByPlaceholder('Short bio');
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
    this.logOutButton = page.locator("button[class*='danger']");
  }

  async updateSettings(userData: UserData) {
    for (const key of Object.keys(userData) as (keyof UserData)[]) {
      await this.page.locator(`[placeholder*="${key}"]`).fill(userData[key] ?? '');
    }
  }
  private async goToSettingsPage() {
    await this.page.goto(`/settings`);
  }
  async userLogout() {
    await this.goToSettingsPage();
    await this.logOutButton.click();
  }
}
