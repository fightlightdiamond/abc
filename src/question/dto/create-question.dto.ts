import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 1, description: 'ID của đáp án' })
  id: number;

  @ApiProperty({ example: 'Đáp án A', description: 'Nội dung của đáp án' })
  text: string;
}

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Câu hỏi ví dụ',
    description: 'Nội dung của câu hỏi',
  })
  text: string;

  @ApiProperty({
    type: [CreateAnswerDto],
    description: 'Danh sách các đáp án',
  })
  answers: CreateAnswerDto[];

  @ApiProperty({
    type: [Number],
    description: 'Danh sách các ID của đáp án đúng',
    example: [1, 2],
  })
  correctAnswerIds: number[];

  @ApiProperty({
    example: '',
    description: 'Giải thích câu trả lời',
    required: false
  })
  @IsOptional()
  explain?: string;
}
