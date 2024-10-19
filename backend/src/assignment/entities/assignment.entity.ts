// src/entities/assignment.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import {ModuleEntity} from "../../modules/entities/module.entity";
import {IAssignment} from "../interfaces/assignment.interface";
import {AssignmentQuestionEntity} from "./assignment-question.entity";
import {AssignmentSubmissionEntity} from "../submission/entities/assignment-submission.entity";


@Entity('assignments')
export class AssignmentEntity implements IAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column('simple-array')
    answerOptions: string[];

    @Column()
    correctAnswer: string;

    @Column()
    moduleId: string;

    @ManyToOne(() => ModuleEntity, (module) => module.assignments)
    module: ModuleEntity;

    @OneToMany(() => AssignmentQuestionEntity, (question) => question.assignment, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    questions: AssignmentQuestionEntity[];

    @OneToMany(()=> AssignmentSubmissionEntity, (submissions) => submissions.assignment)
    submissions: AssignmentSubmissionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
