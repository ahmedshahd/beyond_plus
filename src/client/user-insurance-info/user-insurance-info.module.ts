import { Module } from '@nestjs/common';
import { UserInsuranceInfoService } from './user-insurance-info.service';
import { UserInsuranceInfoResolver } from './user-insurance-info.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    UserInsuranceInfoResolver,
    UserInsuranceInfoService,
    PrismaService,
  ],
})
export class UserInsuranceInfoModule {}
