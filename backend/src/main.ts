import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {dataSource} from "./ormconfig";

async function bootstrap() {
  const port = 3050;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  if(!dataSource.isInitialized){
      await dataSource.initialize();
  }
  await app.listen(port);
}
bootstrap();
