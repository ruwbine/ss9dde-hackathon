import { IsString, IsNotEmpty } from 'class-validator';

export class TextRequest {
  @IsString()
  @IsNotEmpty()
  textForQuiz: string;
}

