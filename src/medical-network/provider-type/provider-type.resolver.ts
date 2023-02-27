import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateProviderTypeInput } from './dto/create-provider-type.input';
import { UpdateProviderTypeInput } from './dto/update-provider-type.input';
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
  @Mutation('createProviderType')
  create(
    @Args('createProviderTypeInput')
    createProviderTypeInput: CreateProviderTypeInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.providerTypeService.create(createProviderTypeInput, language);
  }

  @Mutation('updateProviderType')
  update(
    @Args('updateProviderTypeInput')
    updateProviderTypeInput: UpdateProviderTypeInput,
  ) {
    return this.providerTypeService.update(updateProviderTypeInput);
  }

  @Mutation('removeProviderType')
  remove(@Args('id') id: number) {
    return this.providerTypeService.remove(id);
  }
}
