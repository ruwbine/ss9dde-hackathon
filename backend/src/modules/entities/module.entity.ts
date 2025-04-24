import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import {CourseEntity} from "../../courses/entities/course.entity";
import {AssignmentEntity} from "../../assignment/entities/assignment.entity";
import {IModule} from "../interfaces/module.interface";
import { Quiz } from 'src/ai-gemini/entities/request-quiz.entity';


@Entity('modules')
export class ModuleEntity implements IModule{
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

    @OneToMany(() => AssignmentEntity, (assignment) => assignment.module, {cascade: true, onDelete: 'CASCADE'})
    assignments: AssignmentEntity[];

    @OneToMany(() => Quiz, quizzes => quizzes.module)
    quizzes: Quiz[];

}
