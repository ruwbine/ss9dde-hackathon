import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
import { Quiz } from './request-quiz.entity';
  

@Entity()
export class QuizResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string; 

    @ManyToOne(() => Quiz, (quiz) => quiz.quizResults)
    quiz: Quiz;

    @Column()
    score: number;

    @Column()
    totalQuestions: number;

    @Column('float')
    percentage: number;

    @Column()
    completedAt: Date;
}
  