import { CreateContactUsInput } from './create-contact-us.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactUsInput extends PartialType(CreateContactUsInput) {
  id: number;
}
