// src/db/factories/user.factory.ts
import { User } from '../../_map/entites';
import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.name = faker.person.firstName(sex);
  user.age = faker.number.int({ min: 1, max: 150 });
  user.email = faker.internet.email();
  user.password = faker.person.lastName(sex);

  return user;
});
