import { test, expect, Page } from '@playwright/test';
import { dataGenerator, invalidData } from '../../src/utils/data-generator';
import { RegistrationPage } from '../../src/pages/RegisrationPage';

const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidUser, invalidEmail, invalidPassword } = invalidData;
const responsePromise = (page: Page, response: string) => page.waitForResponse(response);

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  await registerPage.goToRegisterPage();
});

test.describe('register functionality', { tag: ['@smoke-wb', '@registration-wb'] }, () => {
  test(
    'WB-1 valid user registration',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const registerPage = new RegistrationPage(page);
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
      const response = await respPromise;
      await expect(registerPage.errorPanel).not.toBeVisible();
      await expect(page).toHaveURL('/');
      expect(response.status()).toBe(200);
      await expect(registerPage.userProfileButton).toBeVisible();
    },
  );

  test(
    'WB-2 invalid user registration attempt',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const registerPage = new RegistrationPage(page);
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registerPage.userRegistration(invalidUser, invalidEmail, invalidPassword);
      const response: any = await respPromise;
      expect(response.status()).not.toBe(200);
      await expect(registerPage.errorPanel.getByText('username is invalid')).toBeVisible();
      await expect(registerPage.errorPanel.getByText('email is invalid')).toBeVisible();
      await expect(page).toHaveURL(`/register`);
    },
  );
});
