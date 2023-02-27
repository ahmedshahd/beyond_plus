import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  ExpressAdapter,
  createBullBoard,
  BullAdapter,
} from '@bull-board/express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Medical Network Docs')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const redisOptions = {
    host: configService.get<string>('REDIS_HOST'),
  };

  await app.listen(8000);
}
bootstrap();
