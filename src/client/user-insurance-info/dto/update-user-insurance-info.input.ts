import { CreateUserInsuranceInfoInput } from './create-user-insurance-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInsuranceInfoInput extends PartialType(
  CreateUserInsuranceInfoInput,
) {
  id: number;
}
