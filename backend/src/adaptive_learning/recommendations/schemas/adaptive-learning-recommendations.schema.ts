import { z } from 'zod';


export const RecommendationSchema = z.object({
    topic: z.string().min(1),
    suggestion: z.string().min(1),
});

export const RecommendationSchemaArray = z.array(RecommendationSchema)

export type TRecommendationsArray = typeof RecommendationSchemaArray;