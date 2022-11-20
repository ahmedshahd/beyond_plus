import { CreateWelcomeScreenInput } from './create-welcome-screen.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWelcomeScreenInput extends PartialType(
  CreateWelcomeScreenInput,
) {
  id: number;
}
