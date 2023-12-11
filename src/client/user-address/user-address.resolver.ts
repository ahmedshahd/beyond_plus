import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressInput } from './dto/create-user-address.input';
import { UpdateUserAddressInput } from './dto/update-user-address.input';
import { CityClientService } from '../city/city.client.service';
import { AreaClientService } from '../area/area.client.service';

@Resolver('UserAddress')
export class UserAddressResolver {
  constructor(
    private readonly userAddressService: UserAddressService,
    private readonly cityClientService: CityClientService,
    private readonly areaClientService: AreaClientService,
  ) {}

  @Mutation('createUserAddress')
  createUserAddress(
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ) {
    return this.userAddressService.create(createUserAddressInput);
  }

  @Query('userAddresses')
  findAdresses(@Args('uuid') uuid: string) {
    return this.userAddressService.findAdresses(uuid);
  }

  @Query('userAddress')
  findAdress(@Args('id') id: number) {
    return this.userAddressService.findAdress(id);
  }

  @ResolveField('cityName')
  async getCityName(@Parent() userAdress: any) {
    const { clientCityId } = userAdress;
    console.log('cityId', clientCityId);
    if (clientCityId) {
      const city = await this.cityClientService.clientCity(clientCityId);
      console.log('city', city);
      const { name } = city;
      return name;
    }
    return '';
  }

  @ResolveField('areaName')
  async getAreaName(@Parent() userAdress: any) {
    const { clientAreaId } = userAdress;
    console.log('areaId', clientAreaId);
    if (clientAreaId) {
      const area = await this.areaClientService.clientArea(clientAreaId);
      console.log('area', area);
      const { name } = area;
      return name;
    }
    return '';
  }

  @Mutation('updateUserAddress')
  updateUserAddress(
    @Args('updateUserAddressInput')
    updateUserAddressInput: UpdateUserAddressInput,
  ) {
    return this.userAddressService.update(
      updateUserAddressInput.id,
      updateUserAddressInput,
    );
  }

  @Mutation('removeUserAddress')
  removeUserAddress(@Args('id') id: number) {
    return this.userAddressService.remove(id);
  }
}
