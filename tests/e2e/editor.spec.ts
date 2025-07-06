import { test, expect } from '@playwright/test';
import { dataGenerator } from '../../src/utils/data-generator';
import article from '../testdata/article.json';

import { RegistrationPage } from '../../src/pages/RegisrationPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { EditorPage } from '../../src/pages/EditorPage';

let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);

  await registerPage.goToRegisterPage();
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL('/');
  await registerPage.userLogout();
  await loginPage.goToLoginPage();
  await loginPage.userLogin(userEmail, userPassword);
  await expect(registerPage.userProfileButton).toBeVisible();
});

test.describe('editor page functionality', () => {
  test('WB-6, fullfilled article creation', { tag: ['@smoke-wb', '@editor'] }, async ({ page }) => {
    const ARTICLES_COUNT = 5;
    const editorPage = new EditorPage(page);
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
  });
});
