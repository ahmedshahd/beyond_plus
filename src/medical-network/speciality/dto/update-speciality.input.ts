import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialityInput } from './create-speciality.input';

export class UpdateSpecialityInput {
  id: number;
  name?: string;
  providerTypeId?: number;
}
