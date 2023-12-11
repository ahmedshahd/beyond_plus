import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CityService } from './city.service';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update.city.input';

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
      args.limit,
    );
  }
  @Mutation('createCity')
  create(
    @Args('createCityInput') createCityInput: CreateCityInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.cityService.create(createCityInput, language);
  }

  @Mutation('updateCity')
  update(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return this.cityService.update(updateCityInput);
  }

  @Mutation('removeCity')
  remove(@Args('id') id: number) {
    return this.cityService.remove(id);
  }
}
