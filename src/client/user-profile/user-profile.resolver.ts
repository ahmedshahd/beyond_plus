import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation('createUserProfile')
  createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.userProfileService.create(createUserProfileInput);
  }

  // @Query()
  // findAll() {
  //   return this.userProfileService.findAll();
  // }

  @Query('userProfile')
  findOne(@Args('uuid') uuid: string) {
    return this.userProfileService.findOne(uuid);
  }

  @Mutation('updateUserProfile')
  updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.update(
      updateUserProfileInput.uuid,
      updateUserProfileInput,
    );
  }

  @Mutation('removeUserProfile')
  removeUserProfile(@Args('uuid') uuid: string) {
    return this.userProfileService.remove(uuid);
  }
}
