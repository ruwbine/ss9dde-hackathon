import { Module } from '@nestjs/common';
import { AdaptiveLearningService } from './adaptive_learning.service';
import { AdaptiveLearningController } from './adaptive_learning.controller';

@Module({
  providers: [AdaptiveLearningService],
  controllers: [AdaptiveLearningController]
})
export class AdaptiveLearningModule {}
