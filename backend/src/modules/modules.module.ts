import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import {ModulesService} from "./modules.service";
import {ModuleEntity} from "./entities/module.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ModulesRepository} from "./repositories/modules.repository";

@Module({
  imports: [
      TypeOrmModule.forFeature([ModuleEntity])
  ],
  providers: [ModulesService, ModulesRepository],
  controllers: [ModulesController]
})
export class ModulesModule {}
