import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {CreateModuleDto} from "./dto/create-module.dto";
import {ModuleEntity} from "./entities/module.entity";
import {ModulesRepository} from "./repositories/modules.repository";
import {UpdateModuleDto} from "./dto/update-module.dto";
import {CoursesRepository} from "../courses/repository/courses.repository";


@Injectable()
export class ModulesService implements OnModuleInit{
    onModuleInit(): any {
        console.log('Modules service implemented successfully');
    }

    constructor(private readonly moduleRepository: ModulesRepository,
    private readonly courseRepo: CoursesRepository) {}

    async create(createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
        const {courseId} = createModuleDto;
        const course = await this.courseRepo.findOne(courseId);
        if(!course){
            throw new NotFoundException(`Cannot attach module to course with id: ${courseId}. Not found`)
        }
        return await this.moduleRepository.create(createModuleDto)

    }

    async findById(id: string): Promise<ModuleEntity> {
        const module = await this.moduleRepository.findOne(id);
        if (!module) {
            throw new NotFoundException(`Module with id: ${id} not found`);
        }
        return module;
    }

    async findByCourseId(courseId: string): Promise<ModuleEntity[]> {
        const modules = await this.moduleRepository.findByParams({courseId})
        if(!modules){
            throw new NotFoundException(`Module with courseId: ${courseId} not found`);
        }
        return modules;
    }

    async update(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity> {
        const module = await this.moduleRepository.update(id, updateModuleDto);
        if (!module) {
            throw new NotFoundException(`Module with id: ${id} not found`);
        }
        return module;
    }

    async remove(id: string): Promise<void> {
        await this.moduleRepository.remove(id);
    }
}
