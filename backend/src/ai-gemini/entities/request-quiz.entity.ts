import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./request-quiz-questions.entity";
import { ExplanationEntity } from "./requests-explonation.entity";
import { QuizResult } from "./scores.entity";
import { ModuleEntity } from "src/modules/entities/module.entity";
import { QuizTagEntity } from "src/ai-gemini/entities/tags.entity";
 

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

    @ManyToOne(() => ModuleEntity, module => module.quizzes, { onDelete: 'CASCADE' })
    module: ModuleEntity;

    @OneToMany(() => QuizTagEntity, tag => tag.quiz, { cascade: true })
    tags: QuizTagEntity[];

}
