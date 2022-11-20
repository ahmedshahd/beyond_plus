import { CreateTermsAndConditionsInput } from './create-terms-and-conditions.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTermsAndConditionsInput extends PartialType(CreateTermsAndConditionsInput) {
  id: number;
}
