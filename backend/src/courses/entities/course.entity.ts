import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ICourse } from '../interfaces/course.interface';
import {ModuleEntity} from "../../modules/entities/module.entity";

@Entity('courses')
export class CourseEntity implements ICourse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ModuleEntity, (module) => module.course)
    modules: ModuleEntity[];
}
