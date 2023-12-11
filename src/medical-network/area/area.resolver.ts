import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { AreaService } from './area.service';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';

@Resolver('Area')
export class AreaResolver {
  constructor(private readonly areaService: AreaService) {}

  @Query('listAllAreasByCityId')
  async listAllAreasByCityId(
    @Args('cityId') cityId: number[],
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
  @Mutation('createArea')
  create(
    @Args('createAreaInput') createAreaInput: CreateAreaInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.areaService.create(createAreaInput, language);
  }

  @Mutation('updateArea')
  update(@Args('updateAreaInput') updateAreaInput: UpdateAreaInput) {
    return this.areaService.update(updateAreaInput);
  }

  @Mutation('removeArea')
  remove(@Args('id') id: number) {
    return this.areaService.remove(id);
  }
}
