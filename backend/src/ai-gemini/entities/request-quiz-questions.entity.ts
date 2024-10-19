import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionOption } from "./request-quiz-options.entity";
import { Quiz } from "./request-quiz.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    text: string;

    @OneToMany(() => QuestionOption, option => option.question, { cascade: true })
    options: QuestionOption[];

    @ManyToOne(() => Quiz, quiz => quiz.questions) 
    quiz: Quiz; 
}