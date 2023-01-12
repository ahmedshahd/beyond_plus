import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CountryService } from './country.service';

@Resolver('Country')
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query('getCountryByLanguage')
  async getCountryByLanguage(@Args('language') language: LanguageEnum ) {
    return this.countryService.getCountryByLanguage(language);
  }
}
