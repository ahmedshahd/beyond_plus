import { Module } from '@nestjs/common';
import { SubSpecialityService } from './sub-speciality.service';
import { SubSpecialityResolver } from './sub-speciality.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SubSpecialityResolver, SubSpecialityService, PrismaService],
})
export class SubSpecialityModule {}
