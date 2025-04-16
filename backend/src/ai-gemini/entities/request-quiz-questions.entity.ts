import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionOption } from "./request-quiz-options.entity";
import { Quiz } from "./request-quiz.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'varchar', length: 20, default: 'single' })
    type: 'single' | 'multiple' | 'true_false';

    @OneToMany(() => QuestionOption, option => option.question, { cascade: true })
    options: QuestionOption[];

    @ManyToOne(() => Quiz, quiz => quiz.questions ,
    { onDelete: 'CASCADE'})
    quiz: Quiz;
}