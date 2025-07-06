import { test, expect, chromium, BrowserContext } from '@playwright/test';
import { invalidData, dataGenerator } from '../../src/utils/data-generator';
import { RegistrationPage } from '../../src/pages/RegisrationPage';
import { LoginPage } from '../../src/pages/LoginPage';

let registeredUser: any;
const { invalidEmail, invalidPassword } = invalidData;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeAll(async () => {
  // Register a user before running tests
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();
  const registerPage = new RegistrationPage(page);
  await registerPage.goToRegisterPage();
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL('/');
  await browser.close();
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
});

test.describe('login functionality', { tag: ['@smoke-wb', '@login-wb'] }, () => {
  test('WB-3 valid user login', { tag: ['@smoke-wb', '@login-wb'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin(userEmail, userPassword);
    await expect(loginPage.errorPanel).toBeHidden();
    await expect(loginPage.userProfileButton).toContainText(registeredUser.uniqueUser);
    await expect(page).toHaveURL('/');
  });

  test('WB-4 invalid user login attempt', { tag: ['@smoke-wb', '@login-wb'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin(invalidEmail, invalidPassword);
    await expect(loginPage.errorPanel).toBeVisible();
    await expect(loginPage.userProfileButton).toBeHidden();
    await expect(page).toHaveURL(`/login`);
  });
});
