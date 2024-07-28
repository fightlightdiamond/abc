// main.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { faker } from '@faker-js/faker';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postsRepository = dataSource.getRepository(Post);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);

    const users = await userFactory.saveMany(7);

    const posts = await Promise.all(
      Array(117)
        .fill('')
        .map(async () => {
          return await postsFactory.make({
            author: faker.helpers.arrayElement(users),
          });
        }),
    );
    await postsRepository.save(posts);
  }
}
