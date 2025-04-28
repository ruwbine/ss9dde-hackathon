import { GoogleGenerativeAI } from "@google/generative-ai";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { TextResponse } from "./interfaces/request.interface";
import { QuizDataSchema } from "./schemas/request.schema";
import { quizPromptTemplate } from "./promts/gemini-ai.promts";
import { QuizDataService } from "./repository/quiz.repository";
import { ModulesRepository } from "src/modules/repositories/modules.repository";
import { buildQuizFromData } from "./utilits/quizData.utils";

@Injectable()
export class AiGeminiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(AiGeminiService.name);
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    @Inject('REQUEST_SERVICE') private readonly client: ClientProxy,
    private readonly quizDataService:QuizDataService, 
    private readonly moduleRepository: ModulesRepository ,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL') || '';
    this.apiKey = this.configService.get<string>('API_KEY') || '';

    if (!this.baseUrl || !this.apiKey) {
      throw new Error('BASE_URL and API_KEY must be defined in the environment variables.');
    }

    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

async generateText(prompt: string): Promise<string> {
  const model = this.genAI.getGenerativeModel({
    model: 'gemini-2.0-flash', 
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 1,
      topK: 40,
    }
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

async generateQuizData(topic: string, questionType: 'single' | 'multiple' | 'true_false', moduleId: string) {
  const prompt = quizPromptTemplate(topic, questionType, moduleId);
  const rawText = await this.generateText(prompt);

  const cleaned = (() => {
    try {
      const match = rawText.match(/{[\s\S]*}/)?.[0];
      if (!match) throw new Error('No JSON object found');
      return match;
    } catch (e) {
      console.error('Failed to extract JSON:', e);
      throw new Error('Failed to extract JSON');
    }
  })();

  const json = (() => {
    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      throw new Error('Failed to parse JSON');
    }
  })();

  try {
    const parsed = QuizDataSchema.parse(json);
    parsed.quiz.moduleId = moduleId;
    return parsed;
  } catch (validationError) {
    console.error('Failed to validate JSON structure:', validationError);
    throw new Error('Invalid quiz data structure');
  }
}


async handleRequest(
  textForQuiz: string,
  questionType: 'single' | 'multiple' | 'true_false',
  moduleId: string
): Promise<TextResponse> {
  if (!textForQuiz?.trim()) {
    throw new Error('Invalid input: textForQuiz must be a non-empty string');
  }

  const module = await this.moduleRepository.findOne(moduleId);
  if (!module) {
    throw new Error(`Module with ID ${moduleId} not found`);
  }

  const quizData = await this.generateQuizData(textForQuiz, questionType, moduleId);
  if (!quizData?.quiz?.questions?.length) {
    throw new Error('Invalid quiz data received');
  }

  const explanations = quizData.explanations ?? [];
  const quiz = buildQuizFromData(quizData.quiz, module.id);

  await this.quizDataService.saveQuizData(quiz, explanations, module);

  return { explanations, quizQuestions: [quiz] };
}


  }
  

