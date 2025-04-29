import {Controller, Get, UseGuards } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { User } from 'src/users/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from 'src/users/interfaces/user.interface';

@Controller('adaptive-learning')
export class AdaptiveLearningController {
    constructor(private readonly adaptiveService: AdaptiveLearningService) {}

  @UseGuards(JwtAuthGuard)
  @Get('insights')
  async getInsights(@User() user: IUser) {
    return this.adaptiveService.generateInsights(user.id);
  }
}
