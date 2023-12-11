import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InsuranceCompanyResolver } from './insurance-company.resolver';
import { InsuranceCompanyService } from './insurance-company.service';

@Module({
  providers: [
    InsuranceCompanyResolver,
    InsuranceCompanyService,
    PrismaService,
 
  ],
})
export class InsuranceCompanyModule {}
