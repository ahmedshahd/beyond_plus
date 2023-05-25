import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserInsuranceInfoService } from './user-insurance-info.service';
import { CreateUserInsuranceInfoInput } from './dto/create-user-insurance-info.input';
import { UpdateUserInsuranceInfoInput } from './dto/update-user-insurance-info.input';

@Resolver()
export class UserInsuranceInfoResolver {
  constructor(
    private readonly userInsuranceInfoService: UserInsuranceInfoService,
  ) {}

  @Mutation('createUserInsuranceInfo')
  createUserInsuranceInfo(
    @Args('createUserInsuranceInfoInput')
    createUserInsuranceInfoInput: CreateUserInsuranceInfoInput,
  ) {
    return this.userInsuranceInfoService.create(createUserInsuranceInfoInput);
  }

  @Query('userInsuranceInfo')
  findOne(@Args('uuid') uuid: string) {
    return this.userInsuranceInfoService.findOne(uuid);
  }

  @Mutation('updateUserInsuranceInfo')
  updateUserInsuranceInfo(
    @Args('updateUserInsuranceInfoInput')
    updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
  ) {
    return this.userInsuranceInfoService.update(
      updateUserInsuranceInfoInput.id,
      updateUserInsuranceInfoInput,
    );
  }

  @Mutation('removeUserInsuranceInfo')
  removeUserInsuranceInfo(@Args('id') id: number) {
    return this.userInsuranceInfoService.remove(id);
  }
}
