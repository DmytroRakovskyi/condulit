import { Page, Locator } from '@playwright/test';
import { UserData } from '../types/user';

export class SettingsPage {
  readonly page: Page;
  readonly urlPictureInput: Locator;
  readonly userNameInput: Locator;
  readonly bioInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly updateSettingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.urlPictureInput = this.page.getByPlaceholder('URL');
    this.userNameInput = this.page.getByPlaceholder('Your username');
    this.bioInput = this.page.getByPlaceholder('Short bio');
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
  }

  async updateSettings(userData: UserData) {
    for (const key of Object.keys(userData) as (keyof UserData)[]) {
      await this.page.locator(`[placeholder*="${key}"]`).fill(userData[key] ?? '');
    }
  }
}
