import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import {FindOptionsWhere, Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDto } from '../dto/update-course.dto';
import {CreateCourseDto} from "../dto/create-course.dto";
import {ITypeormRepository} from "../../common/interfaces/typeorm-repository.interface";

export class CoursesRepository implements ITypeormRepository<CourseEntity> {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) {}


    async create(courseData: CreateCourseDto): Promise<CourseEntity> {
        const courseEntity = this.courseRepository.create(courseData);
        return this.courseRepository.save(courseEntity);
    }


    async findOne(id: string): Promise<CourseEntity | null> {
        return await this.courseRepository.findOne({ where: { id } });
    }


    async findByParams(params: FindOptionsWhere<CourseEntity>): Promise<CourseEntity[] | null> {
        const courses = await this.courseRepository.find({ where: params });
        return courses ? courses : null;
    }

    async findOneByParams(params: FindOptionsWhere<CourseEntity>): Promise<CourseEntity | null> {
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
