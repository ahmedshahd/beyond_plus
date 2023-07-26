import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorialVideoInput } from './create-tutorial-video';

export class UpdateTutorialVideoInput extends PartialType(
  CreateTutorialVideoInput,
) {
  id: number;
}
