import { PartialType } from '@nestjs/mapped-types';
import { CreateSubSpecialityInput } from './create-speciality.input';

export class UpdateSubSpecialityInput extends PartialType(
  CreateSubSpecialityInput,
) {
  id: number;
}
