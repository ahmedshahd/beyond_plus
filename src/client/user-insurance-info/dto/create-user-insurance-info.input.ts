import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInsuranceInfoInput {
  cardNumber: string;
  companyAddress: string;
  tpa: string;
  insuranceCompany: string;
  userProfileUuid: string;
}
