import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { ProviderService } from './provider.service';

@Resolver('Provider')
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}

  @Query('listAllProvidersByProviderTypeIdAndAreaId')
  async listAllProvidersByProviderTypeIdAndAreaId(
    @Args('language') language: LanguageEnum,
    @Args('specialityId') specialityId: number[],
    @Args('subSpecialityId') subSpecialityId: number[],
    @Args('areaId') areaId: number[],
    @Args('categoryId') categoryId: number[],
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.providerService.listAllProvidersByProviderTypeIdAndAreaId(
      language,
      areaId,
      specialityId,
      subSpecialityId,
      categoryId,
      args.search,
      args.page,
      args.limit,
    );
  }
}
