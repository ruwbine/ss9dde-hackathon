import { InsightsEntity } from "../entities/insights.entity";
import { IAdaptiveLearningTags } from "../interfaces/adaptive-learning-tags.interface";

export class AdaptiveLearningMapper {
    constructor(){}

    static ToTopicsObject(entity: InsightsEntity): IAdaptiveLearningTags{
        return {
            strong: entity.strongTopics,
            improving: entity.improvingTopics,
            declining: entity.decliningTopics,
            weak: entity.weakTopics
        }
    }
}