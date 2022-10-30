import { Module } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PrivacyPolicyResolver } from './privacy-policy.resolver';

@Module({
  providers: [PrivacyPolicyResolver, PrivacyPolicyService]
})
export class PrivacyPolicyModule {}
