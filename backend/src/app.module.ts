import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { databaseConfig } from './ormconfig';
import {RabbitmqModule} from "./rabbitmq/rabbitmq.module";
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ParagraphsModule } from './paragraphs/paragraphs.module';
import { AiGeminiModule } from './ai-gemini/ai-gemini.module';
import { ConfigModule } from '@nestjs/config';
import { AdaptiveLearningModule } from './adaptive_learning/adaptive_learning.module';
import { ApiResponseInterceptor } from './common/api-response/interceptors/api-response.interceptor';

@Module({
  imports: [
    RabbitmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    ProfileModule,
    CoursesModule,
    ModulesModule,
    AssignmentModule,
    ParagraphsModule,
    AiGeminiModule,
    AdaptiveLearningModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApiResponseInterceptor,
    },],
})
export class AppModule {}
