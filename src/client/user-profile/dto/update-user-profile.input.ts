import { PartialType } from '@nestjs/graphql';
import { CreateUserProfileInput } from './create-user-profile.input';

export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {}
