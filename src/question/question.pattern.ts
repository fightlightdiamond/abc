import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller()
export class QuestionPattern {
  constructor(private readonly questionService: QuestionService) {}

  // @MessagePattern('createQuestion')
  // create(@Payload() createQuestionDto: CreateQuestionDto) {
  //   return this.questionService.create(createQuestionDto);
  // }

  // @MessagePattern('findAllQuestion')
  // findAll() {
  //   return this.questionService.findAll();
  // }

  // @MessagePattern('findOneQuestion')
  // findOne(@Payload() id: number) {
  //   return this.questionService.findOne(id);
  // }

  // @MessagePattern('updateQuestion')
  // update(@Payload() updateQuestionDto: UpdateQuestionDto) {
  //   return this.questionService.update(updateQuestionDto.id, updateQuestionDto);
  // }

  // @MessagePattern('removeQuestion')
  // remove(@Payload() id: number) {
  //   return this.questionService.remove(id);
  // }

  // @MessagePattern({ cmd: 'sum' })
  // async accumulate(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }
}
