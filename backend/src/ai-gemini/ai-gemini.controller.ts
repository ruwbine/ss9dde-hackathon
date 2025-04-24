import {  Controller, Logger, Post, UsePipes, ValidationPipe , Body, HttpCode, Delete, Param, Patch, NotFoundException, Get, HttpStatus, Query } from '@nestjs/common';
import {  TextResponse } from './interfaces/request.interface';
import { AiGeminiService } from './ai-gemini.service';
import { TextRequest } from './dto/request.dto';
import { AiGeminiDataService } from './ai-gemini-data.service';
import { plainToInstance } from 'class-transformer';
import { QuizResponseDto } from './dto/expose.dto';
import { QuestionResponseDto } from './dto/question-response.dto';
import { UpdateQuestionDto } from './dto/upddate-quize.dto';
import { PublicQuestionResponseDto } from './dto/public-option.dto';

@Controller('ai-gemini')
@UsePipes(new ValidationPipe({ transform: true }))
export class AiGeminiController {
  private readonly logger = new Logger(AiGeminiController.name);

  constructor(
    private readonly aiGeminiService: AiGeminiService,
    private readonly aiGeminiDataService: AiGeminiDataService,
    ) {}

    @Post('generate')
  async generateQuiz(@Body() textRequest: TextRequest): Promise<TextResponse> {
    try {
      this.logger.log('Received request to generate quiz...');
      const response = await this.aiGeminiService.handleRequest(textRequest.textForQuiz, textRequest.QuestionType, textRequest.moduleId);
      this.logger.log('Quiz generated successfully');
      return response;
    } catch (error) {
      this.logger.error('Error while generating quiz:', error);
      throw error;  
    }
  }

@Get('getAll')
async getAllQuizzes(): Promise<QuizResponseDto[]> {
  const quizzes = await this.aiGeminiDataService.getAllQuizzes();
  return quizzes.map(quiz => plainToInstance(QuizResponseDto, quiz, { excludeExtraneousValues: true }));
}

@Get('get/:id')
async getQuizById(@Param('id') id: string): Promise<QuizResponseDto> {
  try {
    const quiz = await this.aiGeminiDataService.getQuizById(id);
    return plainToInstance(QuizResponseDto, quiz, { excludeExtraneousValues: true });
  } catch (err) {
    throw new NotFoundException(`Quiz with id ${id} not found`);
  }
}

@Delete('delete/:id')
@HttpCode(HttpStatus.NO_CONTENT)
async deleteQuiz(@Param('id') id: string): Promise<void> {
  await this.aiGeminiDataService.deleteQuiz(id);
}

@Get('quiz/:quizId/questions')
async getQuestionsByQuizId(
  @Param('quizId') quizId: string,
): Promise<QuestionResponseDto[]> {
  const questions = await this.aiGeminiDataService.getQuestions(quizId);
  return questions.map((question) =>
    plainToInstance(QuestionResponseDto, question, {
      excludeExtraneousValues: true,
    }),
  );
}


  @Patch('rewrite-quize/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateData: UpdateQuestionDto,
  ): Promise<QuestionResponseDto> {
    const updated = await this.aiGeminiDataService.updateQuestion(id, updateData);
    return plainToInstance(QuestionResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  @Get('module/:moduleId/questions')
  async getQuestionsByModule(
    @Param('moduleId') moduleId: string
  ): Promise<PublicQuestionResponseDto[]> {
    return this.aiGeminiDataService.getQuestionsByModuleId(moduleId);
  }

}
