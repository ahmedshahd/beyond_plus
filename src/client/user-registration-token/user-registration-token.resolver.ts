import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserRegistrationTokenService } from './user-registration-token.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UpsertUserRegistrationTokenInput } from './dto/upsert-user-registration-token.input';

@Resolver('UserRegistrationToken')
export class UserRegistrationTokenResolver {
  constructor(
    private readonly userRegistrationTokenService: UserRegistrationTokenService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Mutation('upsertUserRegistrationToken')
  create(
    @Args('upsertUserRegistrationTokenInput')
    upsertUserRegistrationTokenInput: UpsertUserRegistrationTokenInput,
  ) {
    const {uuid} = upsertUserRegistrationTokenInput;
    const { registrationToken } = upsertUserRegistrationTokenInput;

    return this.userRegistrationTokenService.upsert(uuid, registrationToken);
  }

  @Query('userRegistrationToken')
  findOne(@Args('uuid') uuid: string) {
    return this.userRegistrationTokenService.findOne(uuid);
  }

  @ResolveField('userProfile')
  getUserProfile(@Parent() userRegistrationToken: any  ) {
    const {uuid} = userRegistrationToken
     const user = this.userProfileService.findOne(uuid)
     return user
  }
}
