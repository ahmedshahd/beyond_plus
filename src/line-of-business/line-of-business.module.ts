import { Module } from '@nestjs/common';
import { LineOfBusinessService } from './line-of-business.service';
import { LineOfBusinessResolver } from './line-of-business.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [LineOfBusinessResolver, LineOfBusinessService, PrismaService],
})
export class LineOfBusinessModule {}
