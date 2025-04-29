import { Module } from '@nestjs/common';
import { AiGeminiService } from './ai-gemini.service';
import { AiGeminiController } from './ai-gemini.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/request-quiz.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { QuestionOption } from './entities/request-quiz-options.entity';
import { ExplanationEntity } from './entities/requests-explonation.entity';
import { QuizDataService } from './repository/quiz.repository';
import { AiGeminiDataService } from './ai-gemini-data.service';
import { ModulesModule } from 'src/modules/modules.module';
import { AiGeminiScoresService } from './ai-gemini-scores.service';
import { QuizResult } from './entities/scores.entity';
import { AIGeminiScoresController } from './ai-gemini.scores.controller';
import { QuizTagEntity } from './entities/tags.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionOption,
      Question,
      Quiz,
      ExplanationEntity,
      QuizResult,
      QuizTagEntity,
  ]),
    ModulesModule,
    RabbitmqModule,
    HttpModule,
  ],
  providers: [
    AiGeminiService,QuizDataService,AiGeminiDataService,AiGeminiScoresService,
  ],
  controllers: [AiGeminiController,AIGeminiScoresController],
  exports: [AiGeminiService,AiGeminiDataService,QuizDataService,AiGeminiScoresService],
})
export class AiGeminiModule {}

