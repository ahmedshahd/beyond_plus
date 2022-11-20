import { Module } from '@nestjs/common';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { TermsAndConditionsResolver } from './terms-and-conditions.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TermsAndConditionsResolver, TermsAndConditionsService,PrismaService]
})
export class TermsAndConditionsModule {}
