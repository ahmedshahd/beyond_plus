import { PartialType } from '@nestjs/mapped-types';
import { CreateTpaInput } from './create-tpa.input';

export class UpdateTpaInput extends PartialType(CreateTpaInput) {
  id: number;
}
