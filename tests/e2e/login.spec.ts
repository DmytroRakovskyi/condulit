import { expect } from '@playwright/test';
import { test } from '../e2e_fixtures/baseFixture';

import { invalidData, dataGenerator } from '../../src/utils/data-generator';

let registeredUser: any;
const { invalidEmail, invalidPassword } = invalidData;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

// test.beforeAll(async ({ registrationPage }) => {});

test.describe('login functionality', { tag: ['@smoke-wb', '@login-wb'] }, () => {
  test(
    'WB-3 valid user login',
    { tag: ['@smoke-wb', '@login-wb'] },
    async ({ page, registrationPage, loginPage, settingsPage }) => {
      await registrationPage.goToRegisterPage();
      await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);
      await expect(page).toHaveURL('/');
      await settingsPage.userLogout();
      await loginPage.goToLoginPage();
      await loginPage.userLogin(userEmail, userPassword);
      await expect(loginPage.errorPanel).toBeHidden();
      await expect(loginPage.userProfileButton).toContainText(registeredUser.uniqueUser);
      await expect(page).toHaveURL('/');
    },
  );

  test(
    'WB-4, invalid user login attempt',
    { tag: ['@smoke-wb', '@login-wb'] },
    async ({ page, loginPage }) => {
      await loginPage.goToLoginPage();
      await loginPage.userLogin(invalidEmail, invalidPassword);
      await expect(loginPage.errorPanel).toBeVisible();
      await expect(loginPage.userProfileButton).toBeHidden();
      await expect(page).toHaveURL(`/login`);
    },
  );
});
