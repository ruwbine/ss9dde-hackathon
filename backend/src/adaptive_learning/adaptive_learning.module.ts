import { Module } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { AdaptiveLearningController } from './adaptive_learning.controller';
import { AiGeminiModule } from 'src/ai-gemini/ai-gemini.module';
import { GeneratingAdaptiveQuizService } from './adaptive_learning_generation_adaptive_quiz.service';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports:[
  AiGeminiModule,
  ModulesModule,],
  providers: [AdaptiveLearningService,GeneratingAdaptiveQuizService],
  controllers: [AdaptiveLearningController],
  exports: [AdaptiveLearningService,GeneratingAdaptiveQuizService],
})
export class AdaptiveLearningModule {}
