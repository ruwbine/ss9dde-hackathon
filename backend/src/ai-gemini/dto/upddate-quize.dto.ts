import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";

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