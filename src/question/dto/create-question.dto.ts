import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnswerDto {
  @ApiProperty({ example: 1, description: 'ID của đáp án' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Đáp án A', description: 'Nội dung của đáp án' })
  @IsString()
  text: string;
}

export class CreateQuestionDto {
  @ApiProperty({
    example: '',
    description: 'Nội dung của câu hỏi',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    type: [CreateAnswerDto],
    description: 'Danh sách các đáp án',
    example: [
      { id: 1, text: '' },
      { id: 2, text: '' },
      { id: 3, text: '' },
      { id: 4, text: '' },
    ],
  })
  @Type(() => CreateAnswerDto)
  @IsArray()
  @ValidateNested({ each: true })
  answers: CreateAnswerDto[];

  @ApiProperty({
    type: [Number],
    description: 'Danh sách các ID của đáp án đúng',
    example: [1],
  })
  @IsArray()
  correctAnswerIds: number[];

  @ApiProperty({
    example: '',
    description: 'Giải thích câu trả lời',
    required: false,
  })
  @IsOptional()
  explain?: string;
}
