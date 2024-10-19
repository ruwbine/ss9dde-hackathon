import { IsString, IsArray } from 'class-validator';

export class TextRequest {
  @IsString()
  originalText: string; 
}

export class Explanation {
  @IsString()
  term: string; 

  @IsString()
  description: string; 
}

export class TextResponse {
  @IsString()
  simplifiedText: string; 

  @IsArray()
  explanations: Explanation[]; 

  @IsArray()
  @IsString({ each: true }) 
  quizQuestions: string[]; 

}
