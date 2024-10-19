import { Module } from '@nestjs/common';
import { AiGeminiService } from './ai-gemini.service';
import { AiGeminiController } from './ai-gemini.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    RabbitmqModule,
    HttpModule
  ],
  providers: [AiGeminiService,],
  controllers: [AiGeminiController],
  exports: [AiGeminiService],
})
export class AiGeminiModule {}