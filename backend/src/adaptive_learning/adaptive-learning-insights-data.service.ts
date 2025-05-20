import { Injectable, NotFoundException } from "@nestjs/common";
import { InsightsEntity } from "./entities/insights.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdaptiveLearningInsigthsDataService {
  constructor(
    @InjectRepository(InsightsEntity)
    private readonly repository: Repository<InsightsEntity>
  ) {}

  async saveInsights(userId: string, insights: any): Promise<void> {
    const { summary, topics, scoreHistory, recommendations, nextStep } = insights;

    const userInsights = this.repository.create({
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

    await this.repository.save(userInsights);
  }

  async getInsights(userId: string):Promise<InsightsEntity>{
    const insights = await this.repository.findOne({
      where: {userId}, loadEagerRelations: true
    })

    if(!insights){
      throw new NotFoundException('Cannot find users\'s insights');
    }

    return insights;
  }
  
}
