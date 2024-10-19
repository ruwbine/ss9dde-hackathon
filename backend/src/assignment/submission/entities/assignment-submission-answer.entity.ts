import {IAssignmentSubmissionAnswer} from "../interfaces/assignment-submission-answer.interface";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AssignmentSubmissionEntity} from "./assignment-submission.entity";

@Entity()
export class AssignmentSubmissionAnswerEntity implements IAssignmentSubmissionAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    questionId: string;

    @Column()
    selectedOptionId: string;

    @ManyToOne(() => AssignmentSubmissionEntity, (submission) => submission.answers)
    submission: AssignmentSubmissionEntity;
}