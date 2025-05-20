import {Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { User } from 'src/users/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from 'src/users/interfaces/user.interface';
import { GeneratingAdaptiveQuizService } from './adaptive_learning_generation_adaptive_quiz.service';

@Controller('adaptive-learning')
export class AdaptiveLearningController {
    constructor(
        private readonly adaptiveService: AdaptiveLearningService,
        private readonly adaptiveQuizService: GeneratingAdaptiveQuizService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get('insights')
  async getInsights(@User() user: IUser) {
    return this.adaptiveService.generateInsights(user.id);
  }

  

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateAdaptiveQuiz(
    @User() user: IUser,
    @Body() body: {
      questionType: 'single' | 'multiple' | 'true_false';
      moduleId: string;
    }
  ) {
    const { questionType, moduleId } = body;

    return this.adaptiveQuizService.generateAdaptiveQuiz(
      user.id,
      questionType,
      moduleId
    );
  }

}
