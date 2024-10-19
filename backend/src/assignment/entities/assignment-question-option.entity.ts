import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AssignmentQuestionEntity} from "./assignment-question.entity";

@Entity()
export class AssignmentQuestionOptionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    optionText: string;

    @Column({ default: false })
    isCorrect: boolean;

    @ManyToOne(() => AssignmentQuestionEntity, (question) => question.options)
    question: AssignmentQuestionEntity;
}