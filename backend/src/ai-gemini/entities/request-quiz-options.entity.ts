import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./request-quiz-questions.entity";

@Entity()
export class QuestionOption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    text: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => Question, question => question.options)
    question: Question;
}