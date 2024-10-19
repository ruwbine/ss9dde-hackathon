import { Module } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service';

@Module({
  providers: [ParagraphsService]
})
export class ParagraphsModule {}
