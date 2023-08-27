import { Module } from '@nestjs/common';
import { UserInsuranceInfoService } from './user-insurance-info.service';
import { UserInsuranceInfoResolver } from './user-insurance-info.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';
import { InsuranceCompanyService } from 'src/medical-network/insurance-company/insurance-company.service';
import { TpaService } from 'src/medical-network/tpa/tpa.service';
import { ImageResizeService } from 'src/services/image-resize.service';

@Module({
  providers: [
    UserInsuranceInfoResolver,
    UserInsuranceInfoService,
    PrismaService,
    S3Service,
    TpaService,
    InsuranceCompanyService,
    ImageResizeService
  ],
})
export class UserInsuranceInfoModule {}
