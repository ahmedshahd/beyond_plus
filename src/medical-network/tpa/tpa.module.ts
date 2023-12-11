import { Module } from '@nestjs/common';
import { TpaService } from './tpa.service';
import { TpaResolver } from './tpa.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TpaResolver, TpaService, PrismaService],
})
export class TpaModule {}
