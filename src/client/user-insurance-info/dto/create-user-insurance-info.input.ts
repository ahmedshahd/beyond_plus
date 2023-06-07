import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInsuranceInfoInput {
  cardNumber: number;
  companyAddress: string;
  tpa: string;
  insuranceCompany: string;
  userProfileUuid: string;
  cardImgUrl: string;
}
