import { Injectable } from "@nestjs/common";
import { AiGeminiService } from "src/ai-gemini/ai-gemini.service";
import { TextResponse } from "src/ai-gemini/interfaces/request.interface";
import { QuizDataService } from "src/ai-gemini/repository/quiz.repository";
import { QuizDataSchema } from "src/ai-gemini/schemas/request.schema";
import { buildQuizFromData } from "src/ai-gemini/utilits/quizData.utils";
import { ModulesRepository } from "src/modules/repositories/modules.repository";
import { quizAdaptivePromptTemplate } from "./promts/adaptive_generation_quiz.promt";
import { AiGeminiDataService } from "src/ai-gemini/ai-gemini-data.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InsightsEntity } from "./entities/insights.entity";

@Injectable()
export class GeneratingAdaptiveQuizService {
    constructor(
        private readonly quizDataService: QuizDataService,
        private readonly aiGeminiService: AiGeminiService,
        private readonly moduleRepository: ModulesRepository ,
        private readonly aiGeminiDataService:AiGeminiDataService,
        @InjectRepository(InsightsEntity )
        private readonly insightsRepo: Repository<InsightsEntity>,
    ) {}

    async generateQuizByStrength(
      topicsByCategory: Record<'strong' | 'weak' | 'improving' | 'declining', string[]>,
      questionType: 'single' | 'multiple' | 'true_false',
      moduleId: string
    ): Promise<TextResponse> {
      const weakTopics = topicsByCategory.weak;
    
      if (weakTopics.length === 0) {
        throw new Error('Quiz generation is allowed only if weak topics are available.');
      }
    
      const difficulty: 'easy' = 'easy'; // Всегда лёгкий уровень сложности
    
      const existingQuizzes = await this.aiGeminiDataService.getQuizzesByModuleId(moduleId);
      if (!existingQuizzes || existingQuizzes.length === 0) {
        throw new Error(`No existing quiz found for module ${moduleId}`);
      }
    
      const firstQuiz = existingQuizzes[0];
      const title = firstQuiz.title;
      if (!title) {
        throw new Error(`Existing quiz does not contain a title`);
      }
    
      const prompt = quizAdaptivePromptTemplate(
        { strong: [], weak: weakTopics, improving: [], declining: [] },
        questionType,
        moduleId,
        difficulty
      );
    
      const rawText = await this.aiGeminiService.generateText(prompt);
    
      const cleaned = rawText.match(/{[\s\S]*}/)?.[0];
      if (!cleaned) throw new Error('No JSON object found in the model output.');
    
      const json = JSON.parse(cleaned);
      const parsed = QuizDataSchema.parse(json);
      parsed.quiz.moduleId = moduleId;
    
      const module = await this.moduleRepository.findOne(moduleId);
      if (!module) throw new Error(`Module with ID ${moduleId} not found`);
    
      const explanations = parsed.explanations ?? [];
      const quiz = buildQuizFromData(parsed.quiz, module.id);
    
      await this.quizDataService.saveQuizData(quiz, explanations, module);
    
      return { explanations, quizQuestions: [quiz] };
    }
    
    
    calculateDifficultyFromTopics(
      topics: Record<'strong' | 'weak' | 'improving' | 'declining', string[]>
    ): 'easy' | 'medium' | 'hard' {
      if (topics.weak.length > 0) return 'easy';
      if (topics.improving.length > 0) return 'medium';
      if (topics.strong.length > 0) return 'hard';
  
      return 'medium';
    }
    
    async generateAdaptiveQuiz(
      userId: string,
      questionType: 'single' | 'multiple' | 'true_false',
      moduleId: string
    ): Promise<TextResponse> {
      const insights = await this.insightsRepo.findOne({
        where: { userId },
        order: { createdAt: 'DESC' },  
      });
    
      if (insights) {
        const topicsByCategory: Record<'strong' | 'weak' | 'improving' | 'declining', string[]> = {
          strong: [],
          weak: [],
          improving: [],
          declining: [],
        };
    
        for (let i = 0; i < insights.strongTopics.length; i++) {
          topicsByCategory.strong.push(insights.strongTopics[i]);
        }
    
        for (let i = 0; i < insights.weakTopics.length; i++) {
          topicsByCategory.weak.push(insights.weakTopics[i]);
        }
    
        for (let i = 0; i < insights.improvingTopics.length; i++) {
          topicsByCategory.improving.push(insights.improvingTopics[i]);
        }
    
        for (let i = 0; i < insights.decliningTopics.length; i++) {
          topicsByCategory.declining.push(insights.decliningTopics[i]);
        }
    
        return this.generateQuizByStrength(topicsByCategory, questionType, moduleId);
      }
    
      throw new Error('No insights found for adaptive quiz generation');
    }
    
    }
      