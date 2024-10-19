import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AiGeminiService } from '../ai-gemini.service';

@Processor('text_processing_queue')
export class TextProcessingConsumer {
  constructor(
    private readonly aiGeminiService: AiGeminiService
  ) {}

  @Process('processText')
  async handleProcessText(job: Job) {
    console.log('Processing job with ID:', job.id);
    try {
      const result = await this.aiGeminiService.handleRequest(job.data);
      console.log('Job with ID:', job.id, 'completed successfully with result:', result);
      return result; 
    } catch (error) {
      console.error('Error processing job with ID:', job.id, error);
      throw error;
  }
}
}