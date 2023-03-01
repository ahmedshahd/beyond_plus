import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TpaService } from './tpa.service';
import { CreateTpaInput } from './dto/create-tpa.input';
import { UpdateTpaInput } from './dto/update-tpa.input';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { LanguageEnum } from '@prisma/client';

@Resolver('Tpa')
export class TpaResolver {
  constructor(private readonly tpaService: TpaService) {}

  @Query('listAllTpas')
  async findAll(
    @Args() args: PaginationAndSearchArgs,
    @Args('language') language: LanguageEnum,
  ) {
    return this.tpaService.findAll(
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
  @Query('getTpaId')
  async getTpaId(@Args('name') name: string) {
    return this.tpaService.getTpaId(name);
  }

  @Mutation('createTpa')
  create(
    @Args('createTpaInput') createTpaInput: CreateTpaInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.tpaService.create(createTpaInput, language);
  }

  @Mutation('updateTpa')
  update(@Args('updateTpaInput') updateTpaInput: UpdateTpaInput) {
    return this.tpaService.update(updateTpaInput);
  }

  @Mutation('removeTpa')
  remove(@Args('id') id: number) {
    return this.tpaService.remove(id);
  }
}
