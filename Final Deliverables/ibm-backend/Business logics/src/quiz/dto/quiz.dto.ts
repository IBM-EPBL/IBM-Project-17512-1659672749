import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsArray()
  options: [];
}
