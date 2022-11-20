import { CreateLearnIconInput } from './create-learn-icon.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLearnIconInput extends PartialType(CreateLearnIconInput) {
  id: number;
}
