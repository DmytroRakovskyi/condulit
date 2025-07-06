import { test } from '../e2e_fixtures/baseFixture';
import { expect } from '@playwright/test';
import { dataGenerator } from '../../src/utils/data-generator';
import article from '../testdata/article.json';

let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page, registrationPage, loginPage, settingsPage }) => {
  await registrationPage.goToRegisterPage();
  await registrationPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL('/');
  await settingsPage.userLogout();
  await loginPage.goToLoginPage();
  await loginPage.userLogin(userEmail, userPassword);
  await expect(registrationPage.userProfileButton).toBeVisible();
});

test.describe('editor page functionality', () => {
  test(
    'WB-6, fullfilled article creation',
    { tag: ['@smoke-wb', '@editor'] },
    async ({ page, editorPage }) => {
      const ARTICLES_COUNT = 5;
      for (let i: number = 1; i <= ARTICLES_COUNT; i++) {
        await editorPage.goToEditorPage();
        await editorPage.fillArticle(`${article.title} ${i}`, article.about, article.text);
        await editorPage.verifyArticleText(article.text);
        await editorPage.publishArticle();
        await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
        await editorPage.userProfileButton.click();
        await expect(page).toHaveURL(`/@${uniqueUser}/`);
      }

      await expect(editorPage.articleFeedContent).toHaveCount(ARTICLES_COUNT);
    },
  );
});
