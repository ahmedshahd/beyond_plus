import { Gender } from '@prisma/client';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  uuid: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfbirth: string;
  gender: Gender;
  registrationToken: string
}
