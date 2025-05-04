import { Column,  Entity,  PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class InsightsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  summary: string;

  @Column('text', { array: true })
  strongTopics: string[];

  @Column('text', { array: true })
  weakTopics: string[];

  @Column('text', { array: true })
  improvingTopics: string[];

  @Column('text', { array: true })
  decliningTopics: string[];

  @Column('jsonb')
  scoreHistory: any[];

  @Column('jsonb')
  recommendations: any[];

  @Column()
  nextStep: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

