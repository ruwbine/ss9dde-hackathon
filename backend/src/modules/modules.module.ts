import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import {ModulesService} from "./modules.service";
import {ModuleEntity} from "./entities/module.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ModulesRepository} from "./repositories/modules.repository";
import {CoursesModule} from "../courses/courses.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([ModuleEntity]),
      CoursesModule,
  ],
  providers: [ModulesService, ModulesRepository],
  controllers: [ModulesController],
    exports: [ModulesService , ModulesRepository],
})
export class ModulesModule {}
