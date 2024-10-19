import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IAssignmentQuestion} from "../interfaces/assignment-question.interface";
import {AssignmentEntity} from "./assignment.entity";
import {AssignmentQuestionOptionEntity} from "./assignment-question-option.entity";

@Entity()
export class AssignmentQuestionEntity implements IAssignmentQuestion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    questionText: string;

    @ManyToOne(() => AssignmentEntity, (assignment) => assignment.questions)
    assignment: AssignmentEntity;

    @Column()
    correctAnswer: string;

    @OneToMany(() => AssignmentQuestionOptionEntity, (option) => option.question, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    options: AssignmentQuestionOptionEntity[];


}