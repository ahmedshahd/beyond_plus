import { Module } from '@nestjs/common';
import { ContactUsAdminService } from './contact-us.admin.service';
import { ContactUsAdminResolver } from './contact-us.admin.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ContactUsAdminResolver, ContactUsAdminService, PrismaService],
})
export class ContactUsModule {}
