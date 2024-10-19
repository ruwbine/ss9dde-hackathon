import { Injectable } from '@nestjs/common';
import { AssignmentQuestionEntity } from '../entities/assignment-question.entity';
import { AssignmentQuestionOptionEntity } from '../entities/assignment-question-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {IAssignmentQuestionOption} from "../interfaces/assignment-question-option.interface";

@Injectable()
export class AssignmentQuestionOptionService {
    constructor(
        @InjectRepository(AssignmentQuestionOptionEntity)
        private readonly optionRepository: Repository<AssignmentQuestionOptionEntity>
    ) {}


    async createOptions(optionsDto: IAssignmentQuestionOption[], question: AssignmentQuestionEntity): Promise<AssignmentQuestionOptionEntity[]> {
        const options: AssignmentQuestionOptionEntity[] = [];

        for (const optionDto of optionsDto) {
            const option = new AssignmentQuestionOptionEntity();
            option.optionText = optionDto.optionText;
            option.isCorrect = optionDto.isCorrect;

            const savedOption = await this.optionRepository.save(option);
            options.push(savedOption);
        }
        return options;
    }
}
