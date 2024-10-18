import { Module } from '@nestjs/common';
import { AiGeminiService } from './ai-gemini.service';

@Module({
  providers: [AiGeminiService],
  exports: [AiGeminiService]
})
export class AiGeminiModule {}
