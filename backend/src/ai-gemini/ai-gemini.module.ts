import { Module } from '@nestjs/common';
import { AiGeminiService } from './ai-gemini.service';
import { AiGeminiController } from './ai-gemini.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestSimolifiedEntity } from './entities/request-simplified-text.entity';
import { Quiz } from './entities/request-quiz.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { QuestionOption } from './entities/request-quiz-options.entity';
import { ExplanationEntity } from './entities/requests-explonation.entity';
import { ResponseRepository } from './repository/request.repository';
import { AssignmentModule } from 'src/assignment/assignment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionOption,
      Question,
      Quiz,
      RequestSimolifiedEntity,
      ExplanationEntity
  ]),
    RabbitmqModule,
    HttpModule,
    AssignmentModule,
  ],
  providers: [
    AiGeminiService,
    ResponseRepository,
  ],
  controllers: [AiGeminiController],
  exports: [AiGeminiService],
})
export class AiGeminiModule {}