import { Module } from '@nestjs/common';
import { TermsAndConditionsAdminService } from './terms-and-conditions.admin.service';
import { TermsAndConditionsAdminResolver } from './terms-and-conditions.admin.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    TermsAndConditionsAdminResolver,
    TermsAndConditionsAdminService,
    PrismaService,
  ],
})
export class TermsAndConditionsModule {}
