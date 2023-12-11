import { CreateLabelInput } from './create-label.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLabelInput extends PartialType(CreateLabelInput) {
  id: number;
}
