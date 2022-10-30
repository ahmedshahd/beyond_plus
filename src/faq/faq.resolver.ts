import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';

@Resolver('Faq')
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Mutation('createFaq')
  create(@Args('createFaqInput') createFaqInput: CreateFaqInput) {
    return this.faqService.create(createFaqInput);
  }

  @Query('faq')
  findAll() {
    return this.faqService.findAll();
  }

  @Query('faq')
  findOne(@Args('id') id: number) {
    return this.faqService.findOne(id);
  }

  @Mutation('updateFaq')
  update(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
    return this.faqService.update(updateFaqInput.id, updateFaqInput);
  }

  @Mutation('removeFaq')
  remove(@Args('id') id: number) {
    return this.faqService.remove(id);
  }
}
