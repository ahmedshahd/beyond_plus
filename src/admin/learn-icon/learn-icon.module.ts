import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { LearnIconService } from './learn-icon.service';
import { LearnIconResolver } from './learn-icon.resolver';

@Module({
  providers: [LearnIconResolver, LearnIconService,PrismaService]
})
export class LearnIconModule {}
