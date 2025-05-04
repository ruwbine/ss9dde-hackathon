import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { QuestionResponseDto } from './question-response.dto';





export class ExplanationResponseDto {
  @IsString()
  @Expose() 
  id: string;

  @IsString()
  @Expose() 
  term: string;

  @IsString()
  @Expose() 
  description: string;
}

export class QuizResponseDto {
  @IsString()
  @Expose() 
  id: string;

  
  @IsString()
  @Expose() 
  title: string;

  @IsString()
  @Expose() 
  description: string;

  @IsBoolean()
  @Expose() 
  isCompleted: boolean;

  @IsArray()
  @Expose()
  @Type(() => QuestionResponseDto)
  questions: QuestionResponseDto[];

  @IsArray()
  @Expose()
  @Type(() => ExplanationResponseDto)
  explanations: ExplanationResponseDto[];
}