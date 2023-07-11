import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation('createUserProfile')
  createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
    @Args('profileImg', { type: () => GraphQLUpload, nullable: true })
    profileImg: FileUpload,
  ) {
    return this.userProfileService.create(createUserProfileInput, profileImg);
  }


  @Query('userProfile')
  findOne(@Args('uuid') uuid: string) {
    return this.userProfileService.findOne(uuid);
  }

  @Query('usersProfiles')
  findAll() {
    return this.userProfileService.findAll();
  }  

  @Mutation('updateUserProfile')
  updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
    @Args('profileImg', { type: () => GraphQLUpload, nullable: true })
    profileImg: FileUpload,
  ) {
    return this.userProfileService.update(
      updateUserProfileInput.uuid,
      updateUserProfileInput,
      profileImg,
    );
  }

  @Mutation('removeUserProfile')
  removeUserProfile(@Args('uuid') uuid: string) {
    return this.userProfileService.remove(uuid);
  }

  @Mutation('removeAllUserProfiles')
  removeAllUserProfiles() {
    return this.userProfileService.removeAll();
  }


}
