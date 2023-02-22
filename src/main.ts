import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BullModule } from '@nestjs/bull';
import * as Queue from 'bull';
import * as basicAuth from 'express-basic-auth';
import { CSV_QUEUE } from './medical-network/constants/queue.data';
// import { Queue as QueueMQ, Worker } from 'bullmq';

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

  const csvQUEUE = new Queue(CSV_QUEUE, { redis: redisOptions });

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(csvQUEUE)],
    serverAdapter: serverAdapter,
  });

  BullModule.registerQueue({
    name: CSV_QUEUE,
  });

  app.use(
    '/admin/queues',
    basicAuth({
      users: { admin: 'JBFx@#hW&skYXs^u' },
      challenge: true,
      unauthorizedResponse:
        'Sorry , Please refresh then enter bull board username and password',
    }),
    serverAdapter.getRouter(),
  );

  await app.listen(8000);
}
bootstrap();
