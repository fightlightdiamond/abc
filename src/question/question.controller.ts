import { Controller, Post, Get, Param, Body, Put, Patch } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { Public } from '../auth/auth.decorator';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Public()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tạo câu hỏi mới thành công.',
    type: Question,
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ.' })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.create(createQuestionDto);
  }

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Danh sách câu hỏi.',
    type: [Question],
  })
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Chi tiết câu hỏi.',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Câu hỏi không tìm thấy.' })
  async findOne(@Param('id') id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Cập nhật câu hỏi thành công.',
    type: UpdateResult,
  })
  @ApiResponse({ status: 404, description: 'Câu hỏi không tìm thấy.' })
  @ApiBody({
    type: CreateQuestionDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: CreateQuestionDto,
  ): Promise<UpdateResult> {
    return this.questionService.update(id, updateQuestionDto);
  }
}
