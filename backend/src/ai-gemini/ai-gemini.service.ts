import { GoogleGenerativeAI } from "@google/generative-ai";
import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, finalize, firstValueFrom, interval, take, takeUntil, tap } from "rxjs";
import { IQuiz, TextRequest, TextResponse } from "./interfaces/request.interface";
import { RequestSchema } from "./schemas/request.schema";
import { ResponseRepository } from "./repository/request.repository";
import { AssignmentService } from "src/assignment/services/assignment.service";

@Injectable()
export class AiGeminiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(AiGeminiService.name);
  private readonly genAI: GoogleGenerativeAI;
  private requestsInCurrentMinute = 0;
  private readonly MAX_REQUESTS_PER_MINUTE = 15;  
  private requestQueue: TextRequest[] = [];  
  private isProcessing = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly assigmentService:AssignmentService,
    private readonly responseRepository: ResponseRepository,
    @Inject('REQUEST_SERVICE') private readonly client: ClientProxy, 
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL') || '';
    this.apiKey = this.configService.get<string>('API_KEY') || '';

    if (!this.baseUrl || !this.apiKey) {
      throw new Error('BASE_URL and API_KEY must be defined in the environment variables.');
    }

    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }




  async addToQueue(request: TextRequest): Promise<void> {
    this.logger.log('Adding request to queue...');
    this.requestQueue.push(request);
    this.logger.log(`Current queue length: ${this.requestQueue.length}`);
    this.processQueue();  
}

private async processQueue(): Promise<void> {
    if (this.isProcessing) {
        return;  
    }

    this.isProcessing = true;  

    interval(5000)  
      .pipe(
        tap(() => {
          this.logger.log(`Requests in the current minute: ${this.requestsInCurrentMinute}`);
        }),
        takeUntil(this.queueEmpty$()),  
        finalize(() => {
          this.isProcessing = false;
          this.logger.log('Stopped processing queue.');
        })
      )
      .subscribe(async () => {
        if (this.requestsInCurrentMinute >= this.MAX_REQUESTS_PER_MINUTE) {
          this.logger.warn('Request limit reached, waiting for the next minute...');
          await this.resetRequestsPerMinute();
          return;
        }

        const request = this.requestQueue.shift();  
        if (request) {
          try {
            const response = await this.handleRequest(request.assignmentId);  
            this.logger.log('Processed request:', response);
            this.requestsInCurrentMinute++;  
          } catch (error) {
            this.logger.error('Error processing request:', error);
          }
        }

        if (this.requestQueue.length === 0) {
          this.logger.log('Queue is empty, stopping processing.');
        }
      });
}


private resetRequestsPerMinute(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.requestsInCurrentMinute = 0;  
        this.logger.log('Request limit reset for the next minute');
        resolve();
      }, 60000);  
    });
}

private queueEmpty$(): Observable<boolean> {
    return new Observable((observer) => {
        if (this.requestQueue.length === 0) {
            observer.next(true);
            observer.complete();
        }
    });
}

async handleRequest(assignmentId: string): Promise<TextResponse> {
    this.logger.log('Fetching assignment:', assignmentId);

    const assignment = await this.assigmentService.getAssignmentById(assignmentId);

    if (!assignment) {
        throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log('Using assignment description for prompt:', assignment.description);
    
   
    const prompt = this.generatePrompt(assignment.description);
    this.logger.log('Generated prompt:', prompt);

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        this.logger.log('Generated content:', generatedText);

        const parsedResult = RequestSchema.parse({
            simplifiedText: this.extractSection(generatedText, 'Simplified Text'),
            explanations: this.extractExplanations(generatedText),
            quizQuestions: this.extractQuizQuestions(generatedText),
        });

        if (!parsedResult.explanations || parsedResult.explanations.length < 2) {
            throw new HttpException('At least two explanations are required', 400);
        }

        const quizQuestions: IQuiz = {
            title: assignment.title || "Quiz",
            description: assignment.description || "Description for Quiz",
            questions: (parsedResult.quizQuestions || []).map((questionText: string) => ({
                text: questionText,
                options: [
                    { text: 'Option 1', isCorrect: false },
                    { text: 'Option 2', isCorrect: true }
                ]
            })),
            isCompleted: false,
        };

        await this.responseRepository.saveResponseData({
            simplifiedText: parsedResult.simplifiedText,
            explanations: parsedResult.explanations,
            quizQuestions: [quizQuestions],
        });

        const response: TextResponse = {
            simplifiedText: parsedResult.simplifiedText,
            explanations: parsedResult.explanations,
            quizQuestions: [quizQuestions], 
        };
    
        return response;

    } catch (error) {
        this.logger.error('Error processing text:', error);
        throw new HttpException('Error processing text', 500);
    }
}

  
  private extractSection(generatedText: string, sectionTitle: string): string {
    const sectionStart = generatedText.indexOf(`## ${sectionTitle}`);
    if (sectionStart === -1) return '';
  
    const nextSectionStart = generatedText.indexOf('##', sectionStart + sectionTitle.length + 3);
    return nextSectionStart === -1 
      ? generatedText.slice(sectionStart) 
      : generatedText.slice(sectionStart, nextSectionStart);
  }
  
  private extractExplanations(generatedText: string): { term: string; description: string }[] {
    const explanationSection = this.extractSection(generatedText, 'Complex Terms');
    const explanationLines = explanationSection.split('\n');
  
    const explanations = explanationLines.map(line => {
      const [term, description] = line.split(':');
      if (term && description) {
        return {
          term: term.trim(),
          description: description.trim(),
        };
      }
      return undefined;
    }).filter((explanation): explanation is { term: string; description: string } => Boolean(explanation));
  
    this.logger.log('Extracted explanations:', explanations);
  
    return explanations;
  }
  
  private extractQuizQuestions(content: string): string[] {
    const quizSection = this.extractSection(content, 'Quiz Questions');
    const questionRegex = /\d+\.\s*([^\n]+)/g;
  
    const quizQuestions: string[] = [];
    let match;
  
    while ((match = questionRegex.exec(quizSection)) !== null) {
      quizQuestions.push(match[1].trim());
    }
  
    return quizQuestions;
  }
  
//   private extractQuizData(generatedText: string): any {
//     const quizSection = this.extractSection(generatedText, 'Quiz');
//     return {
//       quiz: {
//         title: 'Quiz Title',
//         description: 'Quiz Description',
//         questions: [
//           {
//             text: 'Question Text',
//             options: [
//               { text: 'Option 1', isCorrect: false },
//               { text: 'Option 2', isCorrect: true },
//             ]
//           }
//         ]
//       },
//       explanations: this.extractExplanations(generatedText), 
//     };
//   }
  
private generatePrompt(description: string): string {
    return `Please simplify the following text and provide detailed explanations for at least four complex terms related to the original text:\n\n${description}. The explanations should be in the following format:

  - **Term 1**: Description of term 1
  - **Term 2**: Description of term 2
  - **Term 3**: Description of term 3
  - **Term 4**: Description of term 4
  
  Additionally, generate at least ten quiz questions based on the content of the simplified text.

  Here is the original text:\n\n${description}`;
}

 
  async getResponseDataById(id: string): Promise<any> {
    return await this.responseRepository.getResponseDataById(id);
  }

  async getAllIds(): Promise<string[]> {
    return await this.responseRepository.getAllIds();
  }

}