import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Post } from '../../_map/entites';

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.content = faker.lorem.sentence();
  post.status = faker.number.int({
    min: 1,
    max: 3,
  });
  return post;
});
