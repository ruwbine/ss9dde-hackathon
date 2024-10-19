import { Injectable } from '@nestjs/common';
import { AssignmentEntity } from '../entities/assignment.entity';
import { AssignmentQuestionEntity } from '../entities/assignment-question.entity';
import { AssignmentQuestionOptionService } from './assignment-question-option.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAssignmentQuestion } from '../interfaces/assignment-question.interface';

@Injectable()
export class AssignmentQuestionService {
    constructor(
        @InjectRepository(AssignmentQuestionEntity)
        private readonly questionRepository: Repository<AssignmentQuestionEntity>,
        private readonly optionService: AssignmentQuestionOptionService
    ) {}

    async createQuestions(questionsDto: IAssignmentQuestion[], assignment: AssignmentEntity): Promise<AssignmentQuestionEntity[]> {
        const questions: AssignmentQuestionEntity[] = [];

        for (const questionDto of questionsDto) {
            const question = new AssignmentQuestionEntity();
            question.questionText = questionDto.questionText;
            question.correctAnswer = questionDto.correctAnswer;

            question.options = await this.optionService.createOptions(questionDto.options, question);

            const savedQuestion = await this.questionRepository.save(question);
            questions.push(savedQuestion);
        }

        return questions;
    }
}
