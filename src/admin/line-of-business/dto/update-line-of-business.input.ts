import { CreateLineOfBusinessInput } from './create-line-of-business.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLineOfBusinessInput extends PartialType(
  CreateLineOfBusinessInput,
) {
  id: number;
}
