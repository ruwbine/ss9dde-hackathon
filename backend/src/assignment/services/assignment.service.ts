import {Injectable, NotFoundException} from '@nestjs/common';
import { AssignmentEntity } from '../entities/assignment.entity';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../../modules/entities/module.entity';
import {ModulesService} from "../../modules/modules.service";
import {AssignmentQuestionService} from "./assignment-questions.service";

@Injectable()
export class AssignmentService {
    constructor(
        @InjectRepository(AssignmentEntity)
        private readonly assignmentRepository: Repository<AssignmentEntity>,
        private readonly questionService: AssignmentQuestionService,
        private readonly moduleService: ModulesService
    ) {}

    async createAssignment(dto: CreateAssignmentDto): Promise<AssignmentEntity> {

        const module = await this.moduleService.findById(dto.moduleId)

        const assignment = new AssignmentEntity();
        assignment.title = dto.title;
        assignment.description = dto.description;
        assignment.module = module;

        const savedAssignment = await this.assignmentRepository.save(assignment);
        savedAssignment.questions = await this.questionService.createQuestions(dto.questions, savedAssignment);
        console.log(savedAssignment.questions);
        return await this.assignmentRepository.save(savedAssignment);
    }

    async getAssignmentsByModuleId(moduleId: string): Promise<AssignmentEntity[]> {
        return await this.assignmentRepository.find({
            where: { module: { id: moduleId } },
            relations: ['questions', 'questions.options'],
        });
    }

    async getAssignmentById(assignmentId: string): Promise<AssignmentEntity> {
        const assignment = await this.assignmentRepository.findOne({
            where: { id: assignmentId },
            relations: ['questions', 'questions.options'],
        });

        if (!assignment) {
            throw new NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }

        return assignment;
    }
}
