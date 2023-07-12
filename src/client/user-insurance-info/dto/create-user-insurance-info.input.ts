import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInsuranceInfoInput {
  cardNumber: string;
  companyAddress: string;
  tpaId: number;
  insuranceCompanyId: number;
  userProfileUuid: string;
}
