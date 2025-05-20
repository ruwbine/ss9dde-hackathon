import { GoogleGenerativeAI } from '@google/generative-ai';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { TextResponse } from './interfaces/request.interface';
import { QuizDataSchema } from './schemas/request.schema';
import { quizPromptTemplate } from './promts/gemini-ai.promts';
import { QuizDataService } from './repository/quiz.repository';
import { ModulesRepository } from 'src/modules/repositories/modules.repository';
import { buildQuizFromData } from './utilits/quizData.utils';
import z from 'zod';

@Injectable()
export class AiGeminiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(AiGeminiService.name);
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    @Inject('REQUEST_SERVICE') private readonly client: ClientProxy,
    private readonly quizDataService: QuizDataService,
    private readonly moduleRepository: ModulesRepository,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL') || '';
    this.apiKey = this.configService.get<string>('API_KEY') || '';

    if (!this.baseUrl || !this.apiKey) {
      throw new Error(
        'BASE_URL and API_KEY must be defined in the environment variables.',
      );
    }

    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateText(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 40,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  }


  /**
 * Generates a structured response from the Gemini API, validated by a Zod schema.
 *
 * @param prompt The prompt to send to the Gemini API.
 * @param schema The Zod schema to validate the response against.
 * @param config Optional configuration for the Gemini API.
 * @returns A promise that resolves to the validated structured response.
 * @throws Error if the API call fails or the response does not match the schema.
 */
  async generateStructuredResponse<T extends z.ZodSchema>(prompt: string, schema: T): Promise<z.infer<T>>{

    try {

    
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    const result = await model.generateContent({
      contents: [{role: 'user', parts: [{text: prompt}]}]
    })

    const response = result.response;
    const text: string = response.text();

    if(!text){
      throw new Error('Gemini API returned an empty response')
    }

    let parsedResponse: any;
    try {
      // Attempt to parse the response as JSON
      parsedResponse = JSON.parse(text);
    } catch (jsonError) {
      // If not valid JSON, try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          parsedResponse = JSON.parse(jsonMatch[1]);
        } catch (innerJsonError) {
          throw new Error(`Gemini API response was not valid JSON and could not be extracted from markdown: ${innerJsonError}`);
        }
      } else {
        throw new Error(`Gemini API response was not valid JSON: ${jsonError}`);
      }
    }

    const validatedData = schema.parse(parsedResponse);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Response validation failed: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error(`Failed to get or parse response from Gemini API: ${error}`);
  }

  }

  async generateQuizData(
    topic: string,
    questionType: 'single' | 'multiple' | 'true_false',
    moduleId: string,
  ) {
    const prompt = quizPromptTemplate(topic, questionType);
    const rawText = await this.generateText(prompt);

    const cleaned = (() => {
      try {
        const match = rawText.match(/{[\s\S]*}/)?.[0];
        if (!match) throw new Error('No JSON object found');
        console.table(match);
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
    moduleId: string,
  ): Promise<TextResponse> {
    if (!textForQuiz?.trim()) {
      throw new Error('Invalid input: textForQuiz must be a non-empty string');
    }

    const module = await this.moduleRepository.findOne(moduleId);
    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }

    const quizData = await this.generateQuizData(
      textForQuiz,
      questionType,
      moduleId,
    );
    if (!quizData?.quiz?.questions?.length) {
      throw new Error('Invalid quiz data received');
    }

    const explanations = quizData.explanations ?? [];
    const quiz = buildQuizFromData(quizData.quiz, module.id);

    await this.quizDataService.saveQuizData(quiz, explanations, module);

    return { explanations, quizQuestions: [quiz] };
  }
}
