import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Quiz } from './request-quiz.entity';

@Entity()
export class ExplanationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    term: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => Quiz, quiz => quiz.explanations)
    quiz: Quiz;

}

