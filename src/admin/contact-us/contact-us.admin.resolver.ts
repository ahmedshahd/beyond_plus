import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { ContactUsAdminService } from './contact-us.admin.service';
import { CreateContactUsInput } from './dto/create-contact-us.input';
import { UpdateContactUsInput } from './dto/update-contact-us.input';

@Resolver('ContactUs')
export class ContactUsAdminResolver {
  constructor(private readonly contactUsAdminService: ContactUsAdminService) {}

  @Mutation('createContactUs')
  create(
    @Args('createContactUsInput') createContactUsInput: CreateContactUsInput,
  ) {
    return this.contactUsAdminService.create(createContactUsInput);
  }

  @Query('contactUs')
  findAll() {
    return this.contactUsAdminService.findAll();
  }

  @Mutation('updateContactUs')
  update(
    @Args('updateContactUsInput') updateContactUsInput: UpdateContactUsInput,
  ) {
    return this.contactUsAdminService.update(updateContactUsInput);
  }

  @Mutation('removeContactUs')
  remove(@Args('id') id: number) {
    return this.contactUsAdminService.remove(id);
  }
}
