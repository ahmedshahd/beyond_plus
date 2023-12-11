import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityResolver } from './speciality.resolver';
import { PrismaService } from 'src/prisma.service';    

@Module({
  providers: [SpecialityResolver, SpecialityService,PrismaService]
})
export class SpecialityModule {}
