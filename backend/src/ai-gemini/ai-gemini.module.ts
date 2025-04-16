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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionOption,
      Question,
      Quiz,
      ExplanationEntity
  ]),
    RabbitmqModule,
    HttpModule,
  ],
  providers: [
    AiGeminiService,QuizDataService,AiGeminiDataService,
  ],
  controllers: [AiGeminiController],
  exports: [AiGeminiService,AiGeminiDataService,QuizDataService],
})
export class AiGeminiModule {}