import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import {ModuleEntity} from "./entities/module.entity";
import {ModulesService} from "./modules.service";
import {CreateModuleDto} from "./dto/create-module.dto";
import {UpdateModuleDto} from "./dto/update-module.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('modules')
export class ModulesController {
    constructor(private readonly moduleService: ModulesService) {}

    @Get('course/:courseId')
    async getModulesByCourseId(@Param('courseId', ParseUUIDPipe) courseId: string): Promise<ModuleEntity[]> {
        return await this.moduleService.findByCourseId(courseId);
    }

    @Get(':id')
    async getModuleById(@Param('id', ParseUUIDPipe) id: string): Promise<ModuleEntity> {
        return await this.moduleService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createModule(@Body() createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
        return await this.moduleService.create(createModuleDto);
    }

    @Put(':id')
    async updateModule(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateModuleDto: UpdateModuleDto,
    ): Promise<ModuleEntity> {
        return await this.moduleService.update(id, updateModuleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteModule(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.moduleService.remove(id);
    }
}
