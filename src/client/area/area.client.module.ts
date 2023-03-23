import { Module } from '@nestjs/common';
import { AreaClientService } from './area.client.service';
import { AreaClientResolver } from './area.client.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AreaClientResolver, AreaClientService, PrismaService],
})
export class AreaClientModule {}
