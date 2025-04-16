import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { QuestionOptionDto } from "./option-question.dto";

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
