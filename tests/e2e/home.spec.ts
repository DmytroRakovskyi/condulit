import { expect, Locator } from '@playwright/test';
import { testLogged as test } from '../e2e_fixtures/baseFixture';

test.describe('home page', { tag: ['@smoke-wb', '@main'] }, () => {
  test(
    'WB-5, home page functionality',
    { tag: ['@smoke-wb', '@main'] },
    async ({ page, homePage }) => {
      await homePage.goToHomePage();
      await homePage.myFeedButton.click();
      await expect(page).toHaveURL(`/my-feed`);
      await homePage.globalFeedButton.click();
      await expect(page).toHaveURL('/');
      const tag: Locator = await homePage.getByTag('demo');
      await tag.click();
      const list: Locator = await homePage.getByList('demo');
      await expect(list).toBeVisible();
      await homePage.articlePreview.click();
      await expect(tag).toBeVisible();
    },
  );
});
