import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class QuestionResponseDto {
  @IsString()
  @Expose() 
  id: string;

  @IsString()
  @Expose() 
  text: string;

  @IsString()
  @Expose() 
  type: 'single' | 'multiple' | 'true_false';

  @Expose()
  @Type(() => QuestionOptionDto)
  options: QuestionOptionDto[];
}

export class QuestionOptionDto {
    @Expose()
    text: string;
  
    @Expose()
    isCorrect: boolean;
  }

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

export class UpdateQuestionOptionDto {
    @IsOptional()
    @IsString()
    id?: string;
  
    @IsString()
    text: string;
  
    @IsBoolean()
    isCorrect: boolean;
  }
  
  export class UpdateQuestionDto {
    @IsOptional()
    @IsString()
    text?: string;
  
    @IsOptional()
    @IsString()
    type?: 'single' | 'multiple' | 'true_false';
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateQuestionOptionDto)
    options?: UpdateQuestionOptionDto[];
  }