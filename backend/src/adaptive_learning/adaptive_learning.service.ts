import { Injectable } from '@nestjs/common';
import { AiGeminiScoresService } from 'src/ai-gemini/ai-gemini-scores.service';
import { AdaptiveLearningInsigthsSaveService } from './adaptive-learning-save-insigths.service';
import { AiGeminiService } from 'src/ai-gemini/ai-gemini.service';


@Injectable()
export class AdaptiveLearningService {
    constructor(
        private readonly aiGeminiScoresService: AiGeminiScoresService,
        private readonly insigthsSaveService: AdaptiveLearningInsigthsSaveService,
        private readonly aiGeminiService: AiGeminiService,
      ) {}

      async generateInsights(userId: string) {
        const completedCount = await this.aiGeminiScoresService.countCompletedResultsByUser(userId);
      
        if (completedCount < 5) {
          return {
            summary: `Complete ${5 - completedCount} more quizzes to get personalized insights.`,
            topics: {
              strong: [],
              weak: [],
              improving: [],
              declining: [],
            },
            scoreHistory: [],
            recommendations: [],
            nextStep: null,
          };
        }
      
        const results = await this.aiGeminiScoresService.getRecentResultsByUser(userId);
        const tagStats: Record<string, { correct: number; wrong: number; history: number[] }> = {};
        const decayFactor = 0.9;
      
        results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
      
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          const tags = result.quiz?.tags || [];
          const weight = Math.pow(decayFactor, i);
      
          const correctPortion = result.percentage / 100;
          const wrongPortion = 1 - correctPortion;
      
          for (const tag of tags) {
            if (!tagStats[tag.tag]) {
              tagStats[tag.tag] = { correct: 0, wrong: 0, history: [] };
            }
      
            const portion = 1 / tags.length;
            tagStats[tag.tag].correct += portion * correctPortion * weight;
            tagStats[tag.tag].wrong += portion * wrongPortion * weight;
            tagStats[tag.tag].history.push(result.percentage);
          }
        }
      
        const weakTopics: string[] = [];
        const strongTopics: string[] = [];
        const improvingTopics: string[] = [];
        const decliningTopics: string[] = [];
      
        const accuracies = Object.values(tagStats).map(
          stat => stat.correct / (stat.correct + stat.wrong),
        );
        const avgAccuracy = accuracies.reduce((a, b) => a + b, 0) / (accuracies.length || 1);
      
        for (const [tag, stats] of Object.entries(tagStats)) {
          const total = stats.correct + stats.wrong;
          const accuracy = stats.correct / total;
      
          if (accuracy < avgAccuracy - 0.1) {
            weakTopics.push(tag);
          } else if (accuracy > avgAccuracy + 0.1) {
            strongTopics.push(tag);
          }
      
          const recent = stats.history.slice(-3);
          const earlier = stats.history.slice(0, -3);
          const avgRecent = recent.reduce((a, b) => a + b, 0) / (recent.length || 1);
          const avgEarlier = earlier.reduce((a, b) => a + b, 0) / (earlier.length || 1);
      
          if (avgRecent - avgEarlier > 10) {
            improvingTopics.push(tag);
          } else if (avgEarlier - avgRecent > 10) {
            decliningTopics.push(tag);
          }
        }
      
        const recommendations = await Promise.all(
          weakTopics.map(async (topic) => {
            const prompt = `A student is weak in the topic "${topic}". Generate a short(it must be very short , only 20 words ), motivational, and practical recommendation to help them improve this topic.`;
            const suggestion = await this.aiGeminiService.generateText(prompt);
            return {
              topic,
              suggestion: suggestion.trim(),
            };
          })
        );
      
        const insights = {
          summary: `You've taken ${results.length} recent quizzes.`,
          topics: {
            strong: strongTopics,
            weak: weakTopics,
            improving: improvingTopics,
            declining: decliningTopics,
          },
          scoreHistory: results.map(r => ({
            quizId: r.quiz?.id,
            score: r.score,
            total: r.totalQuestions,
            percentage: r.percentage,
            date: r.completedAt,
            tags: r.quiz?.tags?.map(t => t.tag),
          })),
          recommendations,
          nextStep: 'Try a quiz focused on your weak and declining topics to improve.',
        };
      
        await this.insigthsSaveService.generateInsightsAndSave(userId, insights);
      
        return insights;
      }
      
}




