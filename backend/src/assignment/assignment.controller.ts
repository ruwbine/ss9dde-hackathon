import {Controller, Post, Body, Param, HttpCode, HttpStatus, Get} from '@nestjs/common';
import {AssignmentService} from "./services/assignment.service";
import {CreateAssignmentDto} from "./dto/create-assignment.dto";
import {ModuleEntity} from "../modules/entities/module.entity";
import {AssignmentEntity} from "./entities/assignment.entity";


@Controller('assignments')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<AssignmentEntity> {
        return this.assignmentService.createAssignment(createAssignmentDto);
    }

    @Get('module/:moduleId')
    async getAssignmentsByModuleId(@Param('moduleId') moduleId: string): Promise<AssignmentEntity[]> {
        return this.assignmentService.getAssignmentsByModuleId(moduleId);
    }


    @Get(':assignmentId')
    async getAssignmentById(@Param('assignmentId') assignmentId: string): Promise<AssignmentEntity> {
        return this.assignmentService.getAssignmentById(assignmentId);
    }
}
