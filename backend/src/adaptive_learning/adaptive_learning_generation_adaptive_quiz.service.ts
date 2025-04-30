import { Injectable } from "@nestjs/common";
import { AiGeminiScoresService } from "src/ai-gemini/ai-gemini-scores.service";
import { AiGeminiService } from "src/ai-gemini/ai-gemini.service";
import { TextResponse } from "src/ai-gemini/interfaces/request.interface";
import { QuizDataService } from "src/ai-gemini/repository/quiz.repository";
import { QuizDataSchema } from "src/ai-gemini/schemas/request.schema";
import { buildQuizFromData } from "src/ai-gemini/utilits/quizData.utils";
import { ModulesRepository } from "src/modules/repositories/modules.repository";
import { quizAdaptivePromptTemplate } from "./promts/adaptive_generation_quiz.promt";

@Injectable()
export class GeneratingAdaptiveQuizService {
    constructor(
        private readonly scoresQuizService: AiGeminiScoresService,
        private readonly quizDataService: QuizDataService,
        private readonly aiGeminiService: AiGeminiService,
        private readonly moduleRepository: ModulesRepository ,
    ) {}

    async generateQuizWithDifficulty(
        topic: string,
        difficulty: 'easy' | 'medium' | 'hard',
        questionType: 'single' | 'multiple' | 'true_false',
        moduleId: string
      ): Promise<TextResponse> {
        const prompt = quizAdaptivePromptTemplate(topic, questionType, moduleId, difficulty);
        const rawText = await this.aiGeminiService.generateText(prompt);
        
        const cleaned = rawText.match(/{[\s\S]*}/)?.[0];
        if (!cleaned) throw new Error('No JSON object found');
      
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

      async generateAdaptiveQuiz(
        userId: string,
        topic: string,
        questionType: 'single' | 'multiple' | 'true_false',
        moduleId: string
      ): Promise<TextResponse> {
        const results = await this.scoresQuizService.getRecentResultsByUser(userId);
        const difficulty = await this.scoresQuizService.calculateDifficulty(results);
    
        return this.generateQuizWithDifficulty(
          topic,
          difficulty,
          questionType,
          moduleId
        );
      }
    }
      