import { Module } from '@nestjs/common';
import { WelcomeScreenAdminService } from './welcome-screen.admin.service';
import { WelcomeScreenAdminResolver } from './welcome-screen.admin.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WelcomeScreenAdminResolver, WelcomeScreenAdminService, PrismaService],
})
export class WelcomeScreenAdminModule {}
