import { CreateTermsAndConditionInput } from './create-terms-and-condition.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTermsAndConditionInput extends PartialType(CreateTermsAndConditionInput) {
  id: number;
}
