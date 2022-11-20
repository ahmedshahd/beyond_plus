import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';
import { LanguageEnum } from '@prisma/client';

@Resolver('Faq')
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Mutation('createFaq')
  create(@Args('createFaqInput') createFaqInput: CreateFaqInput) {
    return this.faqService.create(createFaqInput);
  }

  @Query('faq')
  findAll(@Args('language') language: LanguageEnum) {
    return this.faqService.findAll(language);
  }

  
  @Mutation('updateFaq')
  update(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
    return this.faqService.update( updateFaqInput);
  }

  @Mutation('removeFaq')
  remove(@Args('id') id: number) {
    return this.faqService.remove(id);
  }
}
