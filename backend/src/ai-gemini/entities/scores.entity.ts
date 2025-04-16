import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
import { Quiz } from './request-quiz.entity';
import { UserEntity } from 'src/users/entities/user.entity';
  

@Entity()
export class QuizResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.quizResults)
    user: UserEntity;

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
  