import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { FaqAdminService } from './faq.admin.service';
import { FaqAdminResolver } from './faq.admin.resolver';

@Module({
  providers: [FaqAdminResolver, FaqAdminService, PrismaService],
})
export class FaqModule {}
