import {  Controller, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe , Get, Param, Body } from '@nestjs/common';
import {  TextResponse } from './interfaces/request.interface';
import { AiGeminiService } from './ai-gemini.service';
import { TextRequest } from './dto/request.dto';

@Controller('ai-gemini')
@UsePipes(new ValidationPipe({ transform: true }))
export class AiGeminiController {
  private readonly logger = new Logger(AiGeminiController.name);

  constructor(
    private readonly aiGeminiService: AiGeminiService,
    ) {}

    @Post('generate')
  async generateQuiz(@Body() textRequest: TextRequest): Promise<TextResponse> {
    try {
      this.logger.log('Received request to generate quiz...');
      
      const response = await this.aiGeminiService.handleRequest(textRequest.textForQuiz);
      
      this.logger.log('Quiz generated successfully');
      return response;
    } catch (error) {
      this.logger.error('Error while generating quiz:', error);
      throw error;  
    }
  }
}
