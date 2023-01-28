import { Resolver, Query, Args } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';

@Resolver('Speciality')
export class SpecialityResolver {
  constructor(private readonly specialityService: SpecialityService) {}
  @Query('listAllSpecialityByProviderTypeId')
  async listAllSpecialityByProviderTypeId(
    @Args() args: PaginationAndSearchArgs,
    @Args('providerId') providerId: number[],
    @Args('language') language: LanguageEnum,
  ) {
    return this.specialityService.listAllSpecialityByProviderTypeId(
      providerId,
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
}
