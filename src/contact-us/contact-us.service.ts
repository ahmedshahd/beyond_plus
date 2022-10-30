import { Injectable } from '@nestjs/common';
import { CreateContactUsInput } from './dto/create-contact-us.input';
import { UpdateContactUsInput } from './dto/update-contact-us.input';

@Injectable()
export class ContactUsService {
  create(createContactUsInput: CreateContactUsInput) {
    return 'This action adds a new contactUs';
  }

  findAll() {
    return `This action returns all contactUs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactUs`;
  }

  update(id: number, updateContactUsInput: UpdateContactUsInput) {
    return `This action updates a #${id} contactUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactUs`;
  }
}
