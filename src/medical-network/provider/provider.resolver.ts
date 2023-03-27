import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { ProviderService } from './provider.service';

@Resolver('Provider')
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}

  @Query(
    'listAllProvidersBySpecialityIdAndSubSpecialityIdAndAreaIdAndCategoryId',
  )
  async listAllProvidersByProviderTypeIdAndAreaId(
    @Args('language') language: LanguageEnum,
    @Args('specialityId') specialityId: number[],
    // @Args('subSpecialityId') subSpecialityId: number[],
    @Args('areaId') areaId: number[],
    @Args('categoryId') categoryId: number[],
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.providerService.listAllProvidersBySpecialityIdAndSubSpecialityIdAndAreaIdAndCategoryId(
      language,
      specialityId,
      // subSpecialityId,
      areaId,
      categoryId,
      args.search,
      args.page,
      args.limit,
    );
  }
  @Mutation('createProvider')
  create(
    @Args('createProviderInput') createProviderInput: CreateProviderInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.providerService.create(createProviderInput, language);
  }

  @Mutation('updateProvider')
  update(
    @Args('updateProviderInput') updateProviderInput: UpdateProviderInput,
  ) {
    return this.providerService.update(updateProviderInput);
  }

  @Mutation('removeProvider')
  remove(@Args('id') id: number) {
    return this.providerService.remove(id);
  }
}
