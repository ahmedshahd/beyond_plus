import { Module } from '@nestjs/common';
import { NotificationClientService } from './notification.client.service';
import { NotificationClientResolver } from './notification.client.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [
    NotificationClientResolver,
    NotificationClientService,
    PrismaService,
  ],
})
export class NotificationClientModule {}
