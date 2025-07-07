import { expect, Page } from '@playwright/test';
import { test } from '../e2e_fixtures/baseFixture';
import { dataGenerator, invalidData } from '../../src/utils/data-generator';
import { EditorPage } from '../../src/pages/EditorPage';
import { RegistrationPage } from '../../src/pages/RegisrationPage';

const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidUser, invalidEmail, invalidPassword } = invalidData;
const responsePromise = (page: Page, response: string) => page.waitForResponse(response);

test.beforeEach(async ({ page, registrationPage }) => {
  await registrationPage.goToRegisterPage();
});

test.describe('register functionality', { tag: ['@smoke-wb', '@registration-wb'] }, () => {
  test(
    'WB-1 valid user registration',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page, registrationPage, context }) => {
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);

      const response = await respPromise;
      await expect(registrationPage.errorPanel).toBeHidden();
      await expect(page).toHaveURL('/');
      expect(response.status()).toBe(200);
      await expect(registrationPage.userProfileButton).toBeVisible();
      const state = await context.storageState({ path: '.auth/storage-state.json' });
    },
  );

  test.use({ storageState: '.auth/storage-state.json' });

  test(
    'WB-8, use existing storage state',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const regPage = new RegistrationPage(page);

      const editorPage = new EditorPage(page);
      await page.goto('/');
      await expect(editorPage.userProfileButton).toHaveText(uniqueUser);
    },
  );

  test(
    'WB-2 invalid user registration attempt',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page, registrationPage }) => {
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registrationPage.userRegistration(invalidUser, invalidEmail, invalidPassword);
      const response: any = await respPromise;
      expect(response.status()).not.toBe(200);
      await expect(registrationPage.errorPanel.getByText('username is invalid')).toBeVisible();
      await expect(registrationPage.errorPanel.getByText('email is invalid')).toBeVisible();
      await expect(page).toHaveURL(`/register`);
    },
  );
});
