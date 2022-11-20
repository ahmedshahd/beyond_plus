import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsResolver } from './contact-us.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ContactUsResolver, ContactUsService,PrismaService]
})
export class ContactUsModule {}
