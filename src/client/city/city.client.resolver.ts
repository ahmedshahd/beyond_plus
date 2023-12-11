import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from 'src/medical-network/helpers/pagination-util.dto';
import { CityClientService } from './city.client.service';
import { CreateClientCityInput } from './dto/create-city.client.input';
import { UpdateClientCityInput } from './dto/update-city.client.input';

@Resolver()
export class CityClientResolver {
  constructor(private readonly cityClientService: CityClientService) {}

  @Query('listAllClientCities')
  async listAllCities(
    @Args('language') language: LanguageEnum,
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.cityClientService.listAllClientCities(
      language,
      args.search,
      args.page,
      args.limit,
    );
  }

  @Query('clientCity')
  async clientCity(@Args('id') id: number) {
    return this.cityClientService.clientCity(id);
  }

  @Mutation('createClientCity')
  create(
    @Args('createClientCityInput') createClientCityInput: CreateClientCityInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.cityClientService.create(createClientCityInput, language);
  }

  @Mutation('updateClientCity')
  update(
    @Args('updateClientCityInput') updateClientCityInput: UpdateClientCityInput,
  ) {
    return this.cityClientService.update(updateClientCityInput);
  }

  @Mutation('removeClientCity')
  remove(@Args('id') id: number) {
    return this.cityClientService.remove(id);
  }
}
