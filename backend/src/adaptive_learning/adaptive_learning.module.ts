import { Module } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { AdaptiveLearningController } from './adaptive_learning.controller';
import { AiGeminiModule } from 'src/ai-gemini/ai-gemini.module';

@Module({
  imports:[
  AiGeminiModule],
  providers: [AdaptiveLearningService],
  controllers: [AdaptiveLearningController],
  exports: [AdaptiveLearningService],
})
export class AdaptiveLearningModule {}
