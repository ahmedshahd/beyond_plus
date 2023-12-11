import { Module } from '@nestjs/common';
import { LineOfBusinessAdminService } from './line-of-business.admin.service';
import { LineOfBusinessAdminResolver } from './line-of-business.admin.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    LineOfBusinessAdminResolver,
    LineOfBusinessAdminService,
    S3Service,
    PrismaService,
  ],
})
export class LineOfBusinessAdminModule {}
