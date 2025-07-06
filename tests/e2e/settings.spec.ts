import { expect } from '@playwright/test';
import { test } from '../e2e_fixtures/baseFixture';
import { dataGenerator, userData } from '../../src/utils/data-generator';
import { HomePage } from '../../src/pages/HomePage';

const { uniqueUser, userEmail, userPassword } = dataGenerator();

test.describe('Settings page', { tag: ['@smoke-wb', '@settings-wb'] }, () => {
  test.beforeEach(async ({ page, registrationPage }) => {
    await registrationPage.goToRegisterPage();
    await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);
    await expect(page).toHaveURL('/');
  });

  //test fails due to the issue with the settings page!!!
  test(
    'settings can be updated',
    { tag: ['@smoke-wb', '@settings-wb'] },
    async ({ page, settingsPage, homePage }) => {
      const responsePromise: Promise<any> = page.waitForResponse('**/api/user');
      await homePage.settingsButton.click();
      await settingsPage.updateSettings(userData);
      if (userData.username === undefined) throw new Error('Username is not defined');
      await expect(settingsPage.userNameInput).toHaveValue(userData.username);
      if (userData.bio === undefined) throw new Error('Bio is not defined');
      await expect(settingsPage.bioInput).toHaveValue(userData.bio);
      await settingsPage.updateSettingsButton.click();
      const response = await responsePromise;
      expect(response.status()).toEqual(200);
      await expect(page).toHaveURL('/');
    },
  );
});
