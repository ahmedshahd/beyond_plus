import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { ProviderTypeService } from './provider-type.service';

@Resolver('ProviderType')
export class ProviderTypeResolver {
  constructor(private readonly providerTypeService: ProviderTypeService) {}

  @Query('listAllProviderTypesByInsuranceCompanyId')
  async listAllCitiesByInsuranceCompanyId(
    @Args('language') language: LanguageEnum,
    @Args('insuranceCompanyId') insuranceCompanyId: number,
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.providerTypeService.listAllProviderTypesByInsuranceCompanyId(
      language,
      insuranceCompanyId,
      args.search,
      args.page,
      args.limit,
    );
  }
}
