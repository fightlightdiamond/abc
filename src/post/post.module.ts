import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../_map/entites';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
