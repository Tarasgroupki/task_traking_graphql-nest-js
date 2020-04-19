import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 // console.log('directory:', __dirname);
  app.useStaticAssets('src');
 // app.use(express.static('src'));
  app.enableCors();
  await app.listen(2700);
}
bootstrap();
