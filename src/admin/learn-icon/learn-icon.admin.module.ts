import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { LearnIconAdminService } from './learn-icon.admin.service';
import { LearnIconAdminResolver } from './learn-icon.admin.resolver';

@Module({
  providers: [LearnIconAdminResolver, LearnIconAdminService, PrismaService],
})
export class LearnIconModule {}
