import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LearnIconAdminService } from './learn-icon.admin.service';
import { CreateLearnIconInput } from './dto/create-learn-icon.input';
import { UpdateLearnIconInput } from './dto/update-learn-icon.input';
import { LanguageEnum } from '@prisma/client';

@Resolver('Admin/LearnIcon')
export class LearnIconAdminResolver {
  constructor(private readonly learnIconAdminService: LearnIconAdminService) {}

  @Mutation('createLearnIcon')
  create(
    @Args('createLearnIconInput') createLearnIconInput: CreateLearnIconInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.learnIconAdminService.create(createLearnIconInput, language);
  }

  @Query('learnIcon')
  findAll(
    @Args('language') language: LanguageEnum,
    @Args('search') search: string,
  ) {
    return this.learnIconAdminService.findAll(language, search);
  }

  @Mutation('updateLearnIcon')
  update(
    @Args('updateLearnIconInput') updateLearnIconInput: UpdateLearnIconInput,
  ) {
    return this.learnIconAdminService.update(updateLearnIconInput);
  }

  @Mutation('removeLearnIcon')
  remove(@Args('id') id: number) {
    return this.learnIconAdminService.remove(id);
  }
}
