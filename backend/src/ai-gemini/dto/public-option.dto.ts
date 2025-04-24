import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class PublicQuestionOptionDto {
    @IsString()
    @Expose()
    id: string;
  
    @IsString()
    @Expose()
    text: string;
  }

export class PublicQuestionResponseDto {
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
    options: PublicQuestionOptionDto[];
  }
  