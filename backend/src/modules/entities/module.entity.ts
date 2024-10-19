import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import {CourseEntity} from "../../courses/entities/course.entity";
import {AssignmentEntity} from "../../assignment/entities/assignment.entity";


@Entity('modules')
export class ModuleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column()
    courseId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => CourseEntity, (course) => course.modules)
    course: CourseEntity;

    @OneToMany(() => AssignmentEntity, (assignment) => assignment.module)
    assignments: AssignmentEntity[];
}
