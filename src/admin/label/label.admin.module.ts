import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { LabelAdminService } from './label.admin.service';
import { LabelAdminResolver } from './label.admin.resolver';

@Module({
  providers: [LabelAdminResolver, LabelAdminService, PrismaService],
})
export class LabelModule {}
