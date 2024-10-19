import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateAssignmentDto} from "./dto/create-assignment.dto";
import {AssignmentService} from "./assignment.service";

@UseGuards(JwtAuthGuard)
@Controller('/assignment')
export class AssignmentController {
    constructor(
        private readonly assignmentService: AssignmentService,
    ) {
    }
    @Post()
    async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    }
}