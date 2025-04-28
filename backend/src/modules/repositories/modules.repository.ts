import { InjectRepository } from '@nestjs/typeorm';
import {FindOptionsWhere, Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common'; 
import {ModuleEntity} from "../entities/module.entity";
import {CreateModuleDto} from "../dto/create-module.dto";
import {UpdateModuleDto} from "../dto/update-module.dto";
import { ITypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';

export class ModulesRepository implements ITypeormRepository<ModuleEntity> {
    constructor(
        @InjectRepository(ModuleEntity)
        private readonly moduleRepository: Repository<ModuleEntity>
    ) {}



    async create(moduleDto: CreateModuleDto): Promise<ModuleEntity> {
        const moduleEntity = this.moduleRepository.create(moduleDto);
        return this.moduleRepository.save(moduleEntity);
    }


    async findOne(id: string): Promise<ModuleEntity | null> {
        return await this.moduleRepository.findOne({ where: { id } });
    }


    async findByParams(params: FindOptionsWhere<ModuleEntity>): Promise<ModuleEntity[] | null> {
        const courses = await this.moduleRepository.find({ where: params });
        return courses ? courses : null;
    }

    async findOneByParams(params: FindOptionsWhere<ModuleEntity>): Promise<ModuleEntity | null> {
        const course = await this.moduleRepository.findOne({ where: params });
        return course ? course : null;
    }

    async findAll(): Promise<ModuleEntity[]> {
        return this.moduleRepository.find();
    }

    async remove(id: string): Promise<void> {
        const course = await this.findOne(id);
        if (!course) {
            throw new NotFoundException(`Cannot remove course with id: ${id}. Course not found`);
        }
        await this.moduleRepository.remove(course);
    }

    async update(id: string, data: UpdateModuleDto): Promise<ModuleEntity> {
        const course = await this.findOne(id);
        if (!course) {
            throw new NotFoundException(`Cannot update course with id: ${id}. Course not found`);
        }
        Object.assign(course, data);
        return this.moduleRepository.save(course);
    }
}
