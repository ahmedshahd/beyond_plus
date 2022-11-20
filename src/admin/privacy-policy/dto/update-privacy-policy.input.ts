import { CreatePrivacyPolicyInput } from './create-privacy-policy.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePrivacyPolicyInput extends PartialType(CreatePrivacyPolicyInput) {
  id: number;
}
