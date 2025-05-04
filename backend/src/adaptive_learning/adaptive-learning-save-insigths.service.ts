import { Injectable } from "@nestjs/common";
import { InsightsEntity } from "./entities/insights.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdaptiveLearningInsigthsSaveService {
  constructor(
    @InjectRepository(InsightsEntity)
    private readonly entityInsightsRepository: Repository<InsightsEntity>
  ) {}

  async generateInsightsAndSave(userId: string, insights: any): Promise<void> {
    const { summary, topics, scoreHistory, recommendations, nextStep } = insights;

    const userInsights = this.entityInsightsRepository.create({
      userId,
      summary,
      strongTopics: topics.strong,
      weakTopics: topics.weak,
      improvingTopics: topics.improving,
      decliningTopics: topics.declining,
      scoreHistory,
      recommendations,
      nextStep,
    });

    await this.entityInsightsRepository.save(userInsights);
  }
  
}
