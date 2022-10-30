import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsInput } from './dto/create-contact-us.input';
import { UpdateContactUsInput } from './dto/update-contact-us.input';

@Resolver('ContactUs')
export class ContactUsResolver {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Mutation('createContactUs')
  create(@Args('createContactUsInput') createContactUsInput: CreateContactUsInput) {
    return this.contactUsService.create(createContactUsInput);
  }

  @Query('contactUs')
  findAll() {
    return this.contactUsService.findAll();
  }

  @Query('contactUs')
  findOne(@Args('id') id: number) {
    return this.contactUsService.findOne(id);
  }

  @Mutation('updateContactUs')
  update(@Args('updateContactUsInput') updateContactUsInput: UpdateContactUsInput) {
    return this.contactUsService.update(updateContactUsInput.id, updateContactUsInput);
  }

  @Mutation('removeContactUs')
  remove(@Args('id') id: number) {
    return this.contactUsService.remove(id);
  }
}
