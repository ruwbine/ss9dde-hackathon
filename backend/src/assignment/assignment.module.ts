import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentSubmissionService } from './submission/assignment-submission.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssignmentEntity} from "./entities/assignment.entity";
import {AssignmentSubmissionEntity} from "./submission/entities/assignment-submission.entity";
import {AssignmentQuestionEntity} from "./entities/assignment-question.entity";
import {AssignmentSubmissionAnswerEntity} from "./submission/entities/assignment-submission-answer.entity";
import {AssignmentQuestionOptionEntity} from "./entities/assignment-question-option.entity";
import { AssignmentSubmissionController } from './submission/assignment-submission.controller';
import {AssignmentController} from "./assignment.controller";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          AssignmentEntity,
          AssignmentSubmissionEntity,
          AssignmentQuestionEntity,
          AssignmentSubmissionAnswerEntity,
          AssignmentQuestionOptionEntity
      ])
  ],
  controllers: [AssignmentController, AssignmentSubmissionController],
  providers: [AssignmentService, AssignmentSubmissionService],
})
export class AssignmentModule {}
