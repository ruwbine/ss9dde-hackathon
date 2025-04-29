import { Injectable } from '@nestjs/common';
import { AiGeminiScoresService } from 'src/ai-gemini/ai-gemini-scores.service';


@Injectable()
export class AdaptiveLearningService {
    constructor(
        private readonly aiGeminiScoresService: AiGeminiScoresService,
      ) {}
    
      async generateInsights(userId: string) {
        const results = await this.aiGeminiScoresService.getRecentResultsByUser(userId);
    
        const tagStats: Record<string, { correct: number; wrong: number }> = {};
    
        for (const result of results) {
          const tags = result.quiz?.tags || [];
          const isPerfect = result.percentage === 100;
    
          for (const tag of tags) {
            if (!tagStats[tag.tag]) {
              tagStats[tag.tag] = { correct: 0, wrong: 0 };
            }
            if (isPerfect) {
              tagStats[tag.tag].correct += 1;
            } else {
              tagStats[tag.tag].wrong += 1;
            }
          }
        }
    
        const weakTopics: string[] = [];
        const strongTopics: string[] = [];
    
        for (const [tag, stats] of Object.entries(tagStats)) {
          const total = stats.correct + stats.wrong;
          const accuracy = stats.correct / total;
          if (accuracy < 0.6) {
            weakTopics.push(tag);
          } else {
            strongTopics.push(tag);
          }
        }
    
        return {
          summary: `You’ve taken ${results.length} recent quizzes.`,
          topics: {
            weak: weakTopics,
            strong: strongTopics,
          },
          scoreHistory: results.map(r => ({
            quizId: r.quiz.id,
            score: r.score,
            total: r.totalQuestions,
            percentage: r.percentage,
            date: r.completedAt,
          })),
          recommendations: weakTopics.map(topic => ({
            topic,
            suggestion: `Practice more quizzes related to "${topic}".`,
          })),
          nextStep: 'Try a new quiz focused on your weak areas.',
        };
      }
    
}
