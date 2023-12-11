import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubSpecialityService } from './sub-speciality.service';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateSubSpecialityInput } from './dto/create-speciality.input';
import { UpdateSubSpecialityInput } from './dto/update-speciality.input';
@Resolver('SubSpeciality')
export class SubSpecialityResolver {
  constructor(private readonly subSpecialityService: SubSpecialityService) {}

  @Query('listAllSubSpecialityBySpecialityId')
  async listAllSubSpecialityBySpecialityId(
    @Args() args: PaginationAndSearchArgs,
    @Args('specialityId') specialityId: number[],
    @Args('language') language: LanguageEnum,
  ) {
    return this.subSpecialityService.listAllSubSpecialityBySpecialityId(
      specialityId,
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
  @Mutation('createSubSpeciality')
  create(
    @Args('createSubSpecialityInput')
    createSubSpecialityInput: CreateSubSpecialityInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.subSpecialityService.create(createSubSpecialityInput, language);
  }

  @Mutation('updateSubSpeciality')
  update(
    @Args('updateSubSpecialityInput')
    updateSubSpecialityInput: UpdateSubSpecialityInput,
  ) {
    return this.subSpecialityService.update(updateSubSpecialityInput);
  }

  @Mutation('removeSubSpeciality')
  remove(@Args('id') id: number) {
    return this.subSpecialityService.remove(id);
  }
}
