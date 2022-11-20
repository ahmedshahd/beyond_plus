import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressClientService } from './address.client.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver('User/Address')
export class AddressClientResolver {
  constructor(private readonly addressClientService: AddressClientService) {}

  @Mutation('createAddress')
  create(@Args('createAddressInput') createAddressInput: CreateAddressInput) {
    return this.addressClientService.create(createAddressInput);
  }

  @Query('address')
  findAll() {
    return this.addressClientService.findAll();
  }

  @Query('address')
  findOne(@Args('id') id: number) {
    return this.addressClientService.findOne(id);
  }

  @Mutation('updateAddress')
  update(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput) {
    return this.addressClientService.update(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation('removeAddress')
  remove(@Args('id') id: number) {
    return this.addressClientService.remove(id);
  }
}
