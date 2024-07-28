// seed.ts
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { PostsFactory } from '../factories/post.factory';
import { UsersFactory } from '../factories/user.factory';
import MainSeeder from './main.seeder';
import { entities } from '../../_map/entites';

// const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'nester',
  database: 'nester',
  entities: entities,
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
