import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CoursesRepository } from './repository/courses.repository';
import { CourseEntity } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import {CreateCourseDto} from "./dto/create-course.dto";

@Injectable()
export class CoursesService implements OnModuleInit {

    onModuleInit(): any {
        console.log('Courses service implemented successfully');
    }

    constructor(private readonly coursesRepository: CoursesRepository) {}


    async findById(id: string): Promise<CourseEntity> {
        const course = await this.coursesRepository.findOne(id);
        if (!course) {
            throw new NotFoundException(`Cannot find course with id: ${id}`);
        }
        return course;
    }


    async findAll(): Promise<CourseEntity[]> {
        return await this.coursesRepository.findAll();
    }


    async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
        return await this.coursesRepository.create(createCourseDto);
    }


    async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseEntity> {
        const course = await this.coursesRepository.update(id, updateCourseDto);
        if (!course) {
            throw new NotFoundException(`Cannot update course with id: ${id}. Course not found`);
        }
        return course;
    }

    async remove(id: string): Promise<void> {
        await this.coursesRepository.remove(id);
    }
}
