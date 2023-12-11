import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FaqAdminService } from './faq.admin.service';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';
import { LanguageEnum } from '@prisma/client';

@Resolver('Admin/Faq')
export class FaqAdminResolver {
  constructor(private readonly faqAdminService: FaqAdminService) {}

  @Mutation('createFaq')
  create(
    @Args('createFaqInput') createFaqInput: CreateFaqInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.faqAdminService.create(createFaqInput, language);
  }

  @Query('faq')
  findAll(@Args('language') language: LanguageEnum) {
    return this.faqAdminService.findAll(language);
  }

  @Mutation('updateFaq')
  update(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
    return this.faqAdminService.update(updateFaqInput);
  }

  @Mutation('removeFaq')
  remove(@Args('id') id: number) {
    return this.faqAdminService.remove(id);
  }
}
