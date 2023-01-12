import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async getCountryByLanguage(language: LanguageEnum): Promise<Country[]> {
    return this.prisma.country.findMany({
      where: {
        language,
      },
    });
  }
}
