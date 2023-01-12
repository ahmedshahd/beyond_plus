import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CityService } from './city.service';

@Resolver('City')
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query('listAllCitiesByInsuranceCompanyId')
  async listAllCitiesByInsuranceCompanyId(
    @Args('language') language: LanguageEnum,
    @Args('insuranceCompanyId') insuranceCompanyId: number,
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.cityService.listAllCitiesByInsuranceCompanyId(
      language,
      insuranceCompanyId,
      args.search,
      args.page,
      args.limit
    );
  }
}
