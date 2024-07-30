import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionPattern } from './question.pattern';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../_map/entites';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [QuestionPattern, QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
