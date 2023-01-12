import { Args, Query, Resolver } from '@nestjs/graphql';
import { SubSpecialityService } from './sub-speciality.service';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
@Resolver('SubSpeciality')
export class SubSpecialityResolver {
  constructor(private readonly subSpecialityService: SubSpecialityService) {}

  @Query('listAllSubSpecialityBySpecialityId')
  async listAllSubSpecialityBySpecialityId(
    @Args() args: PaginationAndSearchArgs,
    @Args('specialityId') specialityId: number,
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
}
