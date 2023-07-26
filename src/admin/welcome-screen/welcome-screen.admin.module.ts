import { Module } from '@nestjs/common';
import { WelcomeScreenAdminService } from './welcome-screen.admin.service';
import { WelcomeScreenAdminResolver } from './welcome-screen.admin.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    WelcomeScreenAdminResolver,
    WelcomeScreenAdminService,
    S3Service,
    PrismaService,
  ],
})
export class WelcomeScreenAdminModule {}
