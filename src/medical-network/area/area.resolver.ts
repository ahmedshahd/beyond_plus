import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { AreaService } from './area.service';

@Resolver('Area')
export class AreaResolver {
  constructor(private readonly areaService: AreaService) {}

  @Query('listAllAreasByCityId')
  async listAllAreasByCityId(
    @Args('cityId') cityId: number,
    @Args('language') language: LanguageEnum,
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.areaService.listAllAreasByCityId(
      cityId,
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
}
