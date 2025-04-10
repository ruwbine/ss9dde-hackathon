import { GoogleGenerativeAI } from "@google/generative-ai";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Explanation, IQuiz, TextResponse } from "./interfaces/request.interface";
import { QuizDataSchema } from "./schemas/request.schema";
import { quizPromptTemplate } from "./promts/gemini-ai.promts";
import { QuizDataService } from "./repository/quiz.repository";

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

async generateQuizData(topic: string) {
  const prompt = quizPromptTemplate(topic);
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

async handleRequest(textForQuiz: string): Promise<TextResponse> {
  try {
    if (!textForQuiz || typeof textForQuiz !== 'string') {
      throw new Error('Invalid input: textForQuiz must be a non-empty string');
    }

    const quizData = await this.generateQuizData(textForQuiz);

    if (!quizData || !quizData.quiz || !Array.isArray(quizData.quiz.questions)) {
      throw new Error('Invalid quiz data received');
    }
    const explanations: Explanation[] = quizData.explanations || [];
    const quizQuestions: IQuiz = {
      title: quizData.quiz.title,
      description: quizData.quiz.description,
      questions: quizData.quiz.questions.map((q) => ({
        text: q.text,
        options: q.options.map((o) => ({
          text: o.text,
          isCorrect: o.isCorrect,
        })),
      })),
      isCompleted: false,
    };
    await this.quizDataService.saveQuizData(quizQuestions, explanations);
    return { explanations, quizQuestions: [quizQuestions] };
  } catch (error) {
    this.logger.error('Error generating quiz', {
      error: error.message,
      stack: error.stack,
    });
    throw new Error('An error occurred while generating the quiz');
  }
}


  }
  

