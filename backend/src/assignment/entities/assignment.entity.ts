// src/entities/assignment.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {ModuleEntity} from "../../modules/entities/module.entity";
import {IAssignment} from "../interfaces/assignment.interface";

@Entity('assignments')
export class AssignmentEntity implements IAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    question: string;

    @Column('simple-array')
    answerOptions: string[];

    @Column()
    correctAnswer: string;

    @Column()
    moduleId: string;

    @ManyToOne(() => ModuleEntity, (module) => module.assignments)
    module: ModuleEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
