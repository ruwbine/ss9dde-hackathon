import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
    UseGuards
} from '@nestjs/common';
import {CoursesService} from "./courses.service";
import {CourseEntity} from "./entities/course.entity";
import {CreateCourseDto} from "./dto/create-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

// @UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    async getAllCourses(): Promise<CourseEntity[]> {
        return await this.coursesService.findAll();
    }

    @Get(':id')
    async getCourseById(@Param('id', ParseUUIDPipe) id: string): Promise<CourseEntity> {
        return await this.coursesService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
        return await this.coursesService.create(createCourseDto);
    }

    @Put(':id')
    async updateCourse(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<CourseEntity> {
        return await this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCourse(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.coursesService.remove(id);
    }
}
