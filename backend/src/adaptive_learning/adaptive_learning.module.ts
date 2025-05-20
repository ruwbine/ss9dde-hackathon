import { Module } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { AdaptiveLearningController } from './adaptive_learning.controller';
import { AiGeminiModule } from 'src/ai-gemini/ai-gemini.module';
import { GeneratingAdaptiveQuizService } from './adaptive_learning_generation_adaptive_quiz.service';
import { ModulesModule } from 'src/modules/modules.module';
import { AdaptiveLearningInsigthsDataService } from './adaptive-learning-insights-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightsEntity } from './entities/insights.entity';
import { AdaptiveLearningRecommendationsService } from './recommendations/services/recommendations.service';

@Module({
  imports:[TypeOrmModule.forFeature([InsightsEntity ]),
  AiGeminiModule,
  ModulesModule,],
  providers: [AdaptiveLearningService,GeneratingAdaptiveQuizService,AdaptiveLearningInsigthsDataService, AdaptiveLearningRecommendationsService],
  controllers: [AdaptiveLearningController],
  exports: [AdaptiveLearningService,GeneratingAdaptiveQuizService,AdaptiveLearningInsigthsDataService],
})
export class AdaptiveLearningModule {}
