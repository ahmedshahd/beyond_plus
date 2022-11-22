import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressAdminService } from './address.admin.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver('Admin/Address')
export class AddressAdminResolver {
  constructor(private readonly addressAdminService: AddressAdminService) {}

  @Mutation('createAddress')
  create(@Args('createAddressInput') createAddressInput: CreateAddressInput) {
    return this.addressAdminService.create(createAddressInput);
  }

  @Query('address')
  findAll() {
    return this.addressAdminService.findAll();
  }

  @Query('address')
  findOne(@Args('id') id: number) {
    return this.addressAdminService.findOne(id);
  }

  @Mutation('updateAddress')
  update(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput) {
    return this.addressAdminService.update(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation('removeAddress')
  remove(@Args('id') id: number) {
    return this.addressAdminService.remove(id);
  }
}
