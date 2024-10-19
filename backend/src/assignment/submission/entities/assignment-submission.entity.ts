import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IAssignmentSubmission} from "../interfaces/assignment-submission.interface";
import {AssignmentEntity} from "../../entities/assignment.entity";
import {AssignmentSubmissionAnswerEntity} from "./assignment-submission-answer.entity";


@Entity()
export class AssignmentSubmissionEntity implements IAssignmentSubmission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    userId: string;

    @Column()
    isCompleted: boolean;

    @Column()
    correctCount: number;

    @Column()
    incorrectCount: number;

    @ManyToOne(() => AssignmentEntity, (assignment) => assignment.submissions)
    assignment: AssignmentEntity

    @OneToMany(() => AssignmentSubmissionAnswerEntity, (answers) => answers.submission, {cascade: true})
    answers: AssignmentSubmissionAnswerEntity[]
}