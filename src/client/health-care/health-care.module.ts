import { Module } from '@nestjs/common';
import { HealthCareService } from './health-care.service';
import { HealthCareResolver } from './health-care.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    HealthCareResolver,
    HealthCareService,
    PrismaService,
    S3Service,
  ],
})
export class HealthCaresModule {}
