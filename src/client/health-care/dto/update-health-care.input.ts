import { CreateHealthCareInput } from './create-health-care.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateHealthCareInput extends PartialType(CreateHealthCareInput) {
  id: number;
}
