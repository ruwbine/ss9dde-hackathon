import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AiGeminiDataService } from 'src/ai-gemini/ai-gemini-data.service';
import { AiGeminiScoresService } from 'src/ai-gemini/ai-gemini-scores.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { IUser } from 'src/users/interfaces/user.interface';

@Controller('scores')
export class AIGeminiScoresController {
    private readonly logger = new Logger(AIGeminiScoresController.name);
    
      constructor(
        private readonly aiGeminiDataService: AiGeminiDataService,
        private readonly aiGeminiScoresService: AiGeminiScoresService,
        ) {}


  @UseGuards(JwtAuthGuard)
  @Post(':quizId/submit')
async submit(
  @Param('quizId') quizId: string,
  @User() user: IUser,
  @Body() body: { answers: { questionId: string; selectedOptionIds: string[] }[] }
) {
  try {
    const quizResult = await this.aiGeminiScoresService.calculateAndSaveScore(
      quizId,
      user.id,
      body.answers
    );
    return quizResult;
  } catch (error) {
    throw new Error(`Error submitting quiz: ${error.message}`);
  }
}

@UseGuards(JwtAuthGuard)
@Get('get_scores')
async getMyScores(@User() user: IUser) {
  const results = await this.aiGeminiDataService.getUserQuizResults(user.id);
  return results;
}
}
