import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { entities } from './_map/entites';
import { PhotoModule } from './photo/photo.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { UnzipService, ZipService } from '@app/share';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'nester',
      database: 'nester',
      entities: entities,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature(entities),
    FastifyMulterModule,
    HeroModule,
    UserModule,
    PostModule,
    CustomerModule,
    AccountModule,
    ProductModule,
    ProfileModule,
    PhotoModule,
    CategoryModule,
    QuestionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ZipService, UnzipService],
})
export class AppModule {}
