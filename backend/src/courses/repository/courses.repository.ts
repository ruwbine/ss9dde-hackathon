import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { IRepository } from '../../common/interfaces/repository.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDto } from '../dto/update-course.dto';
import {CreateCourseDto} from "../dto/create-course.dto";

export class CoursesRepository implements IRepository<CourseEntity> {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) {}

    // Создание нового курса
    async create(courseData: CreateCourseDto): Promise<CourseEntity> {
        const courseEntity = this.courseRepository.create(courseData);
        return this.courseRepository.save(courseEntity);
    }

    // Поиск курса по ID
    async findOne(id: string): Promise<CourseEntity | null> {
        return await this.courseRepository.findOne({ where: { id } });
    }

    // Поиск курсов по параметрам
    async findByParams(params: Partial<CourseEntity>): Promise<CourseEntity[] | null> {
        const courses = await this.courseRepository.find({ where: params });
        return courses ? courses : null;
    }

    async findOneByParams(params: Partial<CourseEntity>): Promise<CourseEntity | null> {
        const course = await this.courseRepository.findOne({ where: params });
        return course ? course : null;
    }

    async findAll(): Promise<CourseEntity[]> {
        return this.courseRepository.find();
    }

    async remove(id: string): Promise<void> {
        const course = await this.findOne(id);
        if (!course) {
            throw new NotFoundException(`Cannot remove course with id: ${id}. Course not found`);
        }
        await this.courseRepository.remove(course);
    }

    async update(id: string, data: UpdateCourseDto): Promise<CourseEntity> {
        const course = await this.findOne(id);
        if (!course) {
            throw new NotFoundException(`Cannot update course with id: ${id}. Course not found`);
        }
        Object.assign(course, data);
        return this.courseRepository.save(course);
    }
}
