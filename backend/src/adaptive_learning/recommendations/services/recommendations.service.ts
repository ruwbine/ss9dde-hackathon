import { Injectable } from "@nestjs/common";
import { AiGeminiService } from "src/ai-gemini/ai-gemini.service";
import { createRecommendationsPrompts } from "../prompts/create-recommendation.prompt";
import { RecommendationSchemaArray } from "../schemas/adaptive-learning-recommendations.schema";

@Injectable()
export class AdaptiveLearningRecommendationsService {
    constructor(
        private readonly aiService: AiGeminiService
    ){}


   async processRecommendations(tags: string[]){
    const schema = RecommendationSchemaArray;

        const result = await this.aiService.generateStructuredResponse<typeof schema>(
            createRecommendationsPrompts(tags, schema),
            schema
        )

        return result;
    }
}


