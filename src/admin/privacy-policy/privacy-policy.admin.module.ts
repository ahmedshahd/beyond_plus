import { Module } from '@nestjs/common';
import { PrivacyPolicyAdminService } from './privacy-policy.admin.service';
import { PrivacyPolicyAdminResolver } from './privacy-policy.admin.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [
    PrivacyPolicyAdminResolver,
    PrivacyPolicyAdminService,
    PrismaService,
  ],
})
export class PrivacyPolicyModule {}
