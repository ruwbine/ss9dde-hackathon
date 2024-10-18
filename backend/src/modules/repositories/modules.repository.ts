import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entities/module.entity';
import { IRepository } from '../../common/interfaces/repository.interface';

@Injectable()
export class ModuleRepository implements IRepository<ModuleEntity> {
    constructor(
        @InjectRepository(ModuleEntity)
        private readonly moduleRepository: Repository<ModuleEntity>,
    ) {}

    // Создание нового модуля
    async create(moduleData: Partial<ModuleEntity>): Promise<ModuleEntity> {
        const module = this.moduleRepository.create(moduleData);
        return this.moduleRepository.save(module);
    }

    // Поиск модуля по ID
    async findOne(id: string): Promise<ModuleEntity | null> {
        return await this.moduleRepository.findOne({ where: { id } });
    }

    // Поиск модулей по параметрам
    async findByParams(params: Partial<ModuleEntity>): Promise<ModuleEntity[]> {
        return await this.moduleRepository.find({ where: params });
    }

    // Обновление модуля по ID
    async update(id: string, moduleData: Partial<ModuleEntity>): Promise<ModuleEntity | null> {
        const module = await this.findOne(id);
        if (!module) return null;

        Object.assign(module, moduleData);
        return this.moduleRepository.save(module);
    }

    // Удаление модуля
    async remove(id: string): Promise<void> {
        const module = await this.findOne(id);
        if (module) {
            await this.moduleRepository.remove(module);
        }
    }
}
