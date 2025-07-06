import { APIResponse, expect, test, request } from '@playwright/test';

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticlesResponse {
  articles: Article[];
}

//patern Arrange Act Assert
// Arrange: Set up the test environment, including any necessary data or state.
// Act: Execute the code or functionality being tested.
// Assert: Verify that the outcome matches the expected result.

test('get acticles', async ({ request }) => {
  const response: APIResponse = await request.get(
    'https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10',
  );

  const responseJson = await response.json();
  const responseText = await response.text();
  const responseBuffer = await response.body();

  const dojoArticles: ArticlesResponse = responseJson.articles.filter((value: any) =>
    value.tagList.includes('dojo'),
  );

  console.log(dojoArticles);
});

test('Create User - should be created', async ({ request }) => {
  const requestBody: any = {
    user: {
      email: 'dada@gmail.com',
      password: '12345',
      username: 'tryto',
    },
  };

  const response = await request.post('');
});
