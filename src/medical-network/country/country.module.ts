import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';

@Module({
  providers: [CountryResolver, CountryService, PrismaService],
})
export class CountryModule {}
