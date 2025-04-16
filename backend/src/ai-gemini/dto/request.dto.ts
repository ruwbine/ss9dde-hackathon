import { IsString, IsNotEmpty } from 'class-validator';
import { QuestionType } from '../interfaces/request.interface';

export class TextRequest {
  @IsString()
  @IsNotEmpty()
  textForQuiz: string;
  
  @IsString()
  @IsNotEmpty()
  QuestionType: QuestionType ;
}

