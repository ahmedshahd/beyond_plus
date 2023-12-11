import { Module } from '@nestjs/common';
import { CityClientService } from './city.client.service';
import { CityClientResolver } from './city.client.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CityClientResolver, CityClientService, PrismaService],
})
export class CityClientModule {}
