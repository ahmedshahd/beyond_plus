import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { LearnIconAdminService } from './learn-icon.admin.service';
import { LearnIconAdminResolver } from './learn-icon.admin.resolver';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    LearnIconAdminResolver,
    LearnIconAdminService,
    PrismaService,
    S3Service,
  ],
})
export class LearnIconModule {}
