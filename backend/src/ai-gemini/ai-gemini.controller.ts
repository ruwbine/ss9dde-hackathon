import { Body, Controller, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe , Get, Param } from '@nestjs/common';
import { TextRequest, TextResponse } from './interfaces/request.interface';
import { AiGeminiService } from './ai-gemini.service';

@Controller('ai-gemini')
@UsePipes(new ValidationPipe({ transform: true }))
export class AiGeminiController {
  private readonly logger = new Logger(AiGeminiController.name);

  constructor(
    private readonly aiGeminiService: AiGeminiService,
    ) {}


    @Get('response/:id')
    async getResponseById(@Param('id') id: string): Promise<any> {
    return await this.aiGeminiService.getResponseDataById(id); 
    }
  
    @Get('response-ids')
    async getAllIds(): Promise<string[]> {
      return await this.aiGeminiService.getAllIds();
    }

    // @Post('handle-request')
    // async handleRequest(@Body() parsedResult: any): Promise<{ message: string }> {
    // try {
    //     await this.aiGeminiService.handleRequest(parsedResult); 
    //     return { message: 'Data saved successfully' };
    // }     
    // catch (error) {
    //     console.error('Error in handleRequest:', error); 
    //     throw new HttpException('Error while processing request', HttpStatus.INTERNAL_SERVER_ERROR);
    // }


    @Post(':AssigmentId/process')
    async handleRequest(@Param('id') assignmentId: string): Promise<TextResponse> {
    try {
        return await this.aiGeminiService.handleRequest(assignmentId);
    } catch (error) {
        this.logger.error('Error processing assignment:', error);
        throw new HttpException('Error processing assignment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
