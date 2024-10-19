import { Body, Controller, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TextRequest, TextResponse } from './interfaces/request.interface';
import { AiGeminiService } from './ai-gemini.service';
import { firstValueFrom } from 'rxjs';

@Controller('ai-gemini')
@UsePipes(new ValidationPipe({ transform: true }))
export class AiGeminiController {
  private readonly logger = new Logger(AiGeminiController.name);

  constructor(
    private readonly aiGeminiService: AiGeminiService,
    ) {}


  @Post('generate')
  async processTextTest(@Body() request: TextRequest): Promise<TextResponse> {
    try {
      const response = await this.aiGeminiService.handleRequest(request);
      return response;
    } catch (error) {
      throw new HttpException('Failed to process text', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('process-request')
async processRequest(@Body() request: TextRequest): Promise<{ message: string; response?: TextResponse }> {
  this.logger.log('Adding request to the queue');
  

  await this.aiGeminiService.addToQueue(request);
  
  
  try {
    const response = await this.aiGeminiService.handleRequest(request);
    return {
      message: 'Request processed and result generated.',
      response,  
    };
  } catch (error) {
    this.logger.error('Failed to process the request:', error);
    throw new HttpException('Failed to process request', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}
