import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AreaResolver } from './area.resolver';
import { AreaService } from './area.service';

@Module({
  providers: [AreaResolver, AreaService, PrismaService],
})
export class AreaModule {}
