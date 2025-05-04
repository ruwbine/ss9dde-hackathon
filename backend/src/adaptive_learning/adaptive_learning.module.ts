import { Module } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { AdaptiveLearningController } from './adaptive_learning.controller';
import { AiGeminiModule } from 'src/ai-gemini/ai-gemini.module';
import { GeneratingAdaptiveQuizService } from './adaptive_learning_generation_adaptive_quiz.service';
import { ModulesModule } from 'src/modules/modules.module';
import { AdaptiveLearningInsigthsSaveService } from './adaptive-learning-save-insigths.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightsEntity } from './entities/insights.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InsightsEntity ]),
  AiGeminiModule,
  ModulesModule,],
  providers: [AdaptiveLearningService,GeneratingAdaptiveQuizService,AdaptiveLearningInsigthsSaveService,],
  controllers: [AdaptiveLearningController],
  exports: [AdaptiveLearningService,GeneratingAdaptiveQuizService,AdaptiveLearningInsigthsSaveService],
})
export class AdaptiveLearningModule {}
