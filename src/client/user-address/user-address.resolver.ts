import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressInput } from './dto/create-user-address.input';
import { UpdateUserAddressInput } from './dto/update-user-address.input';

@Resolver()
export class UserAddressResolver {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Mutation('createUserAddress')
  createUserAddress(
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ) {
    return this.userAddressService.create(createUserAddressInput);
  }

  @Query('userAddresses')
  findOne(@Args('uuid') uuid: string) {
    return this.userAddressService.findOne(uuid);
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
