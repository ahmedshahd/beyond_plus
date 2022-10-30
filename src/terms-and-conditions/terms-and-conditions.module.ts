import { Module } from '@nestjs/common';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { TermsAndConditionsResolver } from './terms-and-conditions.resolver';

@Module({
  providers: [TermsAndConditionsResolver, TermsAndConditionsService]
})
export class TermsAndConditionsModule {}
