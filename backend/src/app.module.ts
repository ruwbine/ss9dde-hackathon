import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { databaseConfig } from './ormconfig';
import {RabbitmqModule} from "./rabbitmq/rabbitmq.module";
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { AssignmentModule } from './assignment/assignment.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
