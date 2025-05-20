import { Injectable } from '@nestjs/common';
import { AiGeminiScoresService } from 'src/ai-gemini/ai-gemini-scores.service';
import { AdaptiveLearningInsigthsSaveService } from './adaptive-learning-save-insigths.service';
import { AiGeminiService } from 'src/ai-gemini/ai-gemini.service';
import { QuizResult } from 'src/ai-gemini/entities/scores.entity';
import { IAdaptiveLearningTags } from './interfaces/adaptive-learning-tags.interface';
import { AdaptiveLearningRecommendationsService } from './recommendations/services/recommendations.service';

type TInsights = {
  summary: string,
  topics: {
    strong: string[],
    weak: string[]
    improving: string[],
    declining: string[]
  }
}


@Injectable()
export class AdaptiveLearningService {
  constructor(
    private readonly aiGeminiScoresService: AiGeminiScoresService,
    private readonly insigthsSaveService: AdaptiveLearningInsigthsSaveService,
    private readonly recommendationService: AdaptiveLearningRecommendationsService
  ) {}


  // 1 функция - 1 ответственность должна быть (SRP) - S

  // 1 проанализровать, как работает код, и правильно ли он работает сейчас?
  // 2 разделить эту функцию на несколько частей, чтобы легче было поддерживать код
  // 3 сделать интерфейсы, чтобы правильно подбирались типы


  // если у пользователя меньше 5 пройденных тестов - не надо генерировать теги
  // если у него больше 5 - можем запускать генерацию тегов

  // когда нужно генерировать, чтобы не делать часто запросы в ИИ? 
  async generateInsights(userId: string) {

    //получаем количество пройденных тестов
    const completedCount =
      await this.aiGeminiScoresService.countCompletedResultsByUser(userId);

    // if (completedCount < 5) {
    //   return {
    //     summary: `Complete ${5 - completedCount} more quizzes to get personalized insights.`,
    //     topics: {
    //       strong: [],
    //       weak: [],
    //       improving: [],
    //       declining: [],
    //     },
    //     scoreHistory: [], 
    //     recommendations: [], // какой тут тип?
    //     nextStep: null,
    //   };

    //   // можно вынести в отдельный тип или интерфейс и потом переиспользовать, просто создавая как есть новый объект.
    // }

    const scoreHistory =
      await this.aiGeminiScoresService.getRecentResultsByUser(userId);
  
      const topics = await this.generateTags(scoreHistory);

      // 1 создать схему рекомендации чтобы легче было сказать gemini, что делать
      // отправлять не каждый тэг по отдельности, а все сразу
      // сохранять в бд

      const recommendations = await this.recommendationService.processRecommendations(topics.weak)
    

    const insights = {
      summary: `You've taken ${scoreHistory.length} recent quizzes.`,
      topics,
      scoreHistory, 
      recommendations,
      nextStep: 'Try a quiz focused on your weak and declining topics to improve.',
    };

    await this.insigthsSaveService.saveInsights(userId, insights);

    return insights;
  }



  private async generateTags(results: QuizResult[]):Promise<IAdaptiveLearningTags> {
    const tagStats: Record<
      string,
      { correct: number; wrong: number; history: number[] }
    > = {};
    const decayFactor = 0.9;
    console.log(results);

    results.sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
    );

    
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
      (stat) => stat.correct / (stat.correct + stat.wrong),
    );
    const avgAccuracy =
      accuracies.reduce((a, b) => a + b, 0) / (accuracies.length || 1);

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
      const avgRecent =
        recent.reduce((a, b) => a + b, 0) / (recent.length || 1);
      const avgEarlier =
        earlier.reduce((a, b) => a + b, 0) / (earlier.length || 1);

      if (avgRecent - avgEarlier > 10) {
        improvingTopics.push(tag);
      } else if (avgEarlier - avgRecent > 10) {
        decliningTopics.push(tag);
      }
    }

    const result: IAdaptiveLearningTags = {
      strong: strongTopics,
      weak: weakTopics,
      improving: improvingTopics,
      declining: decliningTopics,
    }

    return result;
  }

}
