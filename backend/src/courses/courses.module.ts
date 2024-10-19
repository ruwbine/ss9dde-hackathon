import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import {CoursesRepository} from "./repository/courses.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseEntity} from "./entities/course.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity])
  ],
  providers: [CoursesService, CoursesRepository],
  controllers: [CoursesController],
  exports: [CoursesRepository]
})
export class CoursesModule {}
