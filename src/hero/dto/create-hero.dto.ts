import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHeroDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  @IsString()
  name: string;
}
