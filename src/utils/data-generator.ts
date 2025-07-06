import { UserData } from '../types/user';
import { faker } from '@faker-js/faker';

const dataGenerator = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  const uniqueUser = `user${randomNumber}${timestamp}`;
  const userEmail = `${uniqueUser}@test.com`;
  const userPassword = '12345';

  return { uniqueUser, userEmail, userPassword };
};

const invalidData = {
  invalidUser: 'user_',
  invalidEmail: '1234@i',
  invalidPassword: '1',
};

export const userData: UserData = {
  username: faker.person.fullName(),
  bio: faker.person.bio(),
};

export { dataGenerator, invalidData };
