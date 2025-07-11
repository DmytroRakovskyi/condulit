import { test, chromium, Page, expect } from '@playwright/test';
import fs from 'fs';
import { dataGenerator } from './src/utils/data-generator';
import { RegistrationPage } from './src/pages/RegisrationPage';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const { uniqueUser, userEmail, userPassword } = dataGenerator();
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goToRegisterPage('https://demo.learnwebdriverio.com/register');
  await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(registrationPage.userProfileButton).toBeVisible();

  const storageState = await page.context().storageState();
  fs.writeFileSync('.auth/storage-state.json', JSON.stringify(storageState, null, 2));

  await browser.close();
}

export default globalSetup;
