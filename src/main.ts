import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BullModule } from '@nestjs/bull';
import * as Queue from 'bull';
import * as basicAuth from 'express-basic-auth';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { CSV_QUEUE } from './medical-network/constants/queue.data';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });

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
    host: 'localhost',
  };

  const csvQUEUE = new Queue(CSV_QUEUE, { redis: redisOptions });
  const { router } = createBullBoard([new BullAdapter(csvQUEUE)]);
  BullModule.registerQueue({
    name: CSV_QUEUE,
  });

  app.use(
    '/bull',
    basicAuth({
      users: { admin: 'JBFx@#hW&skYXs^u' },
      challenge: true,
      unauthorizedResponse:
        'Sorry , Please refresh then enter bull board username and password',
    }),
    router,
  );

  await app.listen(8000);
}
bootstrap();
