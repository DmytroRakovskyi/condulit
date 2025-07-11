import { test as base, BrowserContext, expect } from '@playwright/test';
import fs from 'fs';
import { dataGenerator } from '../../src/utils/data-generator';
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

export const testLogged = test.extend<BaseFixtures>({
  context: async ({ browser }, use) => {
    const raw: string = fs.readFileSync('.auth/storage-state.json', 'utf-8');
    const storageState = JSON.parse(raw);
    const context: BrowserContext = await browser.newContext({ storageState });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});
