import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from 'src/medical-network/helpers/pagination-util.dto';
import { AreaClientService } from './area.client.service';
import { CreateClientAreaInput } from './dto/create-area.client.input';
import { UpdateClientAreaInput } from './dto/update-area.client.input';

@Resolver('ClientArea')
export class AreaClientResolver {
  constructor(private readonly areaClientService: AreaClientService) {}

  @Mutation('createClientArea')
  create(
    @Args('createClientAreaInput') createClientAreaInput: CreateClientAreaInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.areaClientService.create(createClientAreaInput, language);
  }

  @Query('listAllClientAreasByClientCityId')
  async listAllClientAreasByClientCityId(
    @Args('clientCityId') clientCityId: number[],
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.areaClientService.listAllClientAreasByClientCityId(
      clientCityId,
      args.search,
      args.page,
      args.limit,
    );
  }
  @Query('clientArea')
  async clientArea(
    @Args('id') id: number,
  ) {
    return this.areaClientService.clientArea(
      id
    );
  }

  @Mutation('updateClientArea')
  update(
    @Args('updateClientAreaInput') updateClientAreaInput: UpdateClientAreaInput,
  ) {
    return this.areaClientService.update(updateClientAreaInput);
  }

  @Mutation('removeClientArea')
  remove(@Args('id') id: number) {
    return this.areaClientService.remove(id);
  }
}
