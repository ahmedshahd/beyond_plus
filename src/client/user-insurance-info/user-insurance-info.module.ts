import { Module } from '@nestjs/common';
import { UserInsuranceInfoService } from './user-insurance-info.service';
import { UserInsuranceInfoResolver } from './user-insurance-info.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';

@Module({
  providers: [
    UserInsuranceInfoResolver,
    UserInsuranceInfoService,
    PrismaService,
    S3Service,
  ],
})
export class UserInsuranceInfoModule {}
