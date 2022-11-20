import { Module } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PrivacyPolicyResolver } from './privacy-policy.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrivacyPolicyResolver, PrivacyPolicyService, PrismaService],
})
export class PrivacyPolicyModule {}
