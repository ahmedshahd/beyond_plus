import { CreateWellnessTipInput } from './create-wellness-tip.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWellnessTipInput extends PartialType(CreateWellnessTipInput) {
  id: number;
}
