import { expect, Locator } from '@playwright/test';
import { test } from '../e2e_fixtures/baseFixture';
import { dataGenerator } from '../../src/utils/data-generator';

let registeredUser: any;
registeredUser = dataGenerator();

const { uniqueUser, userEmail, userPassword } = registeredUser;

test.describe('home page', { tag: ['@smoke-wb', '@main'] }, () => {
  test.beforeEach(async ({ page, registrationPage }) => {
    await registrationPage.goToRegisterPage();
    await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);
    await expect(page).toHaveURL('/');
  });

  test(
    'WB-5, home page functionality',
    { tag: ['@smoke-wb', '@main'] },
    async ({ page, homePage }) => {
      await homePage.myFeedButton.click();
      await expect(page).toHaveURL(`/my-feed`);
      await homePage.globalFeedButton.click();
      await expect(page).toHaveURL('/');
      const tag: Locator = await homePage.getByTag('demo');
      await tag.click();
      const list: Locator = await homePage.getByList('demo');
      await expect(list).toBeVisible();
      await homePage.articlePreview.click();
      await expect(list).toBeVisible();
    },
  );
});
