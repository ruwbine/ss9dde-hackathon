import { Expose } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

export class QuestionOptionDto {
    @IsString()
    @Expose()
    id: string;

    @IsString()
    @Expose()
    text: string;
  
    @IsBoolean()
    @Expose()
    isCorrect: boolean;
  }