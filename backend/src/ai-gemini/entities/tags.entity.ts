import { Quiz } from 'src/ai-gemini/entities/request-quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class QuizTagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string; 

  @ManyToOne(() => Quiz, quiz => quiz.tags, { onDelete: 'CASCADE' })
  quiz: Quiz;
  
}
