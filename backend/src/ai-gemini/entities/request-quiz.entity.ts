import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./request-quiz-questions.entity";
import { ExplanationEntity } from "./requests-explonation.entity";
import { QuizResult } from "./scores.entity";
 

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: false })
    isCompleted: boolean;

    @OneToMany(() => Question, question => question.quiz, { cascade: true })
    questions: Question[];

    @OneToMany(() => ExplanationEntity, explanation => explanation.quiz, { cascade: true })
    explanations: ExplanationEntity[];

    @OneToMany(() => QuizResult, (quizResults) => quizResults.quiz)
    quizResults: QuizResult[];

 
}
