import { PartialType } from '@nestjs/mapped-types';
import { CreateInsuranceCompanyInput } from './create-insurance-company.input';

export class UpdateInsuranceCompanyInput extends PartialType(
  CreateInsuranceCompanyInput,
) {
  id: number;
}
