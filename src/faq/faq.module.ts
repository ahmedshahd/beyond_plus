import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqResolver } from './faq.resolver';

@Module({
  providers: [FaqResolver, FaqService,PrismaService]
})
export class FaqModule {}
