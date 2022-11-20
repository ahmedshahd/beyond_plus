import { Module } from '@nestjs/common';
import { WelcomeScreenService } from './welcome-screen.service';
import { WelcomeScreenResolver } from './welcome-screen.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WelcomeScreenResolver, WelcomeScreenService, PrismaService],
})
export class WelcomeScreenModule {}
