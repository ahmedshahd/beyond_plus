import { Module } from '@nestjs/common';
import { WellnessTipsService } from './wellness-tips.service';
import { WellnessTipsResolver } from './wellness-tips.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    WellnessTipsResolver,
    WellnessTipsService,
    PrismaService,
    S3Service,
  ],
})
export class WellnessTipsModule {}
