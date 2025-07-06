import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { RegistrationPage } from '../../src/pages/RegisrationPage';
import { dataGenerator } from '../../src/utils/data-generator';

let registeredUser: any;
registeredUser = dataGenerator();

const { uniqueUser, userEmail, userPassword } = registeredUser;

test.describe('home page', { tag: ['@smoke-wb', '@main'] }, () => {
  test.beforeEach(async ({ page }) => {
    let registerPage: RegistrationPage = new RegistrationPage(page);
    await registerPage.goToRegisterPage();
    await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
    await expect(page).toHaveURL('/');
  });

  test('WB-5, home page functionality', { tag: ['@smoke-wb', '@main'] }, async ({ page }) => {
    const mainPage = new HomePage(page);
    await mainPage.myFeedButton.click();
    await expect(page).toHaveURL(`/my-feed`);
    await mainPage.globalFeedButton.click();
    await expect(page).toHaveURL('/');
    const tag: Locator = await mainPage.getByTag('demo');
    await tag.click();
    const list: Locator = await mainPage.getByList('demo');
    await expect(list).toBeVisible();
    await mainPage.articlePreview.click();
    await expect(list).toBeVisible();
  });
});
