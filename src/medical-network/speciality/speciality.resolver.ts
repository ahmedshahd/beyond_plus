import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateSpecialityInput } from './dto/create-speciality.input';
import { UpdateSpecialityInput } from './dto/update-speciality.input';

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
  @Mutation('createSpeciality')
  create(
    @Args('createSpecialityInput') createSpecialityInput: CreateSpecialityInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.specialityService.create(createSpecialityInput, language);
  }

  @Mutation('updateSpeciality')
  update(
    @Args('updateSpecialityInput') updateSpecialityInput: UpdateSpecialityInput,
  ) {
    return this.specialityService.update(updateSpecialityInput);
  }

  @Mutation('removeSpeciality')
  remove(@Args('id') id: number) {
    return this.specialityService.remove(id);
  }
}
