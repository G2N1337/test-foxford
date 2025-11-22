import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ required: true, example: 'Новая задача' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ required: false, example: 'Описание задачи' })
  @IsString()
  description: string;
}
