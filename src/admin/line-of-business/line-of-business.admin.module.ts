import { Module } from '@nestjs/common';
import { LineOfBusinessAdminService } from './line-of-business.admin.service';
import { LineOfBusinessAdminResolver } from './line-of-business.admin.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [LineOfBusinessAdminResolver, LineOfBusinessAdminService, PrismaService],
})
export class LineOfBusinessAdminModule {}
