import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';

@Module({
  providers: [CityResolver, CityService, PrismaService],
})
export class CityModule {}
