import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';

@Module({
  providers: [LabelResolver, LabelService,PrismaService]
})
export class LabelModule {}
