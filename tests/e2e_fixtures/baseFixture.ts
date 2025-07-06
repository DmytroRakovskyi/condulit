import { test as base } from '@playwright/test';
import { RegistrationPage } from '../../src/pages/RegisrationPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { EditorPage } from '../../src/pages/EditorPage';
import { HomePage } from '../../src/pages/HomePage';
import { SettingsPage } from '../../src/pages/SettingsPage';

export type BaseFixtures = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  editorPage: EditorPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
};

export const test = base.extend<BaseFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  editorPage: async ({ page }, use) => {
    const editorPage = new EditorPage(page);
    await use(editorPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
});
