import { GoogleGenerativeAI } from "@google/generative-ai";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Explanation, IQuiz, TextResponse } from "./interfaces/request.interface";
import { QuizDataSchema } from "./schemas/request.schema";
import { quizPromptTemplate } from "./promts/gemini-ai.promts";
import { QuizDataService } from "./repository/quiz.repository";
import { ModulesRepository } from "src/modules/repositories/modules.repository";

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

async generateQuizData(topic: string , questionType: 'single' | 'multiple' | 'true_false' , moduleId: string ) {
  const prompt = quizPromptTemplate(topic, questionType, moduleId);
  const rawText = await this.generateText(prompt);

  try {
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned);
    const parsed = QuizDataSchema.parse(json);
    return parsed;
  } catch (e) {
    console.error('Failed to validate or parse response:', e);
    throw new Error('Failed to generate valid quiz data');
  }
}

async handleRequest(
  textForQuiz: string,
  questionType: 'single' | 'multiple' | 'true_false',
  moduleId: string
): Promise<TextResponse> {
  try {
    if (!textForQuiz || textForQuiz.trim().length === 0) {
      throw new Error('Invalid input: textForQuiz must be a non-empty string');
    }

    this.logger.log(`Attempting to find module with ID: ${moduleId}`);
    const module = await this.moduleRepository.findOne(moduleId);

    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }

    this.logger.log('Generating quiz data...');
    const quizData = await this.generateQuizData(textForQuiz, questionType , moduleId);

    if (!quizData || !quizData.quiz || !Array.isArray(quizData.quiz.questions)) {
      this.logger.error('Invalid quiz data received', {
        quizData: JSON.stringify(quizData),
      });
      throw new Error('Invalid quiz data received');
    }

    this.logger.log('Quiz data received successfully');
    const explanations: Explanation[] = quizData.explanations || [];

    const quiz: IQuiz = {
      title: quizData.quiz.title,
      description: quizData.quiz.description,
      isCompleted: false,
      module: module.id,
      questions: quizData.quiz.questions.map((q) => ({
        text: q.text,
        type: q.type ?? (q.options && q.options.length === 2 &&
          q.options.some((o) => o.text.toLowerCase() === 'true') &&
          q.options.some((o) => o.text.toLowerCase() === 'false') ? 'true_false' :
          (q.options.filter((o) => o.isCorrect).length > 1 ? 'multiple' : 'single')),
        options: q.options.map((o) => ({
          text: o.text,
          isCorrect: o.isCorrect,
        })),
      })),
    };

    try {
      await this.quizDataService.saveQuizData(quiz, explanations, module);
    } catch (saveError) {
      this.logger.error('Error saving quiz data', {
        error: saveError.message,
        stack: saveError.stack,
      });
      throw new Error('Failed to save quiz data');
    }

    return { explanations, quizQuestions: [quiz] };
  } catch (error) {
    this.logger.error('Error generating quiz', {
      error: error.message,
      stack: error.stack,
    });
    throw new Error('An error occurred while generating the quiz');
  }
}


  }
  

