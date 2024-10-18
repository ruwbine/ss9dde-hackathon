import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ZodSchema, z } from 'zod';
import { TextRequest, TextResponse } from './interfaces/request.interface';

@Injectable()
export class AiGeminiService {
    private readonly baseUrl = process.env.BASE_URL
    private readonly apiKey = process.env.API_KEY      

    constructor(private readonly httpService: HttpService) {}

      async processText(request: TextRequest): Promise<TextResponse> {
        const schema = z.object({
          simplifiedText: z.string(),
          explanations: z.array(z.object({
            term: z.string(),
            description: z.string(),
          })),
          quizQuestions: z.array(z.string()),
        });
    
        try {
          const response = await firstValueFrom(
            this.httpService.post(
              `${this.baseUrl}/generate-response`,
              {
                prompt: this.generatePrompt(request.originalText),
                key: this.apiKey,
              },
            ),
          );
    
          const result = schema.parse(response.data); 
          return result;
        } catch (error) {
          throw new HttpException('Error processing text', 500);
        }
      }
    
      private generatePrompt(originalText: string): string {
        return `Please simplify the following text and provide explanations for any complex terms along with examples. Additionally, generate quiz questions based on the content:\n\n${originalText}`;
      }
    }
    
