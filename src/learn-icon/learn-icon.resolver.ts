import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LearnIconService } from './learn-icon.service';
import { CreateLearnIconInput } from './dto/create-learn-icon.input';
import { UpdateLearnIconInput } from './dto/update-learn-icon.input';

@Resolver('LearnIcon')
export class LearnIconResolver {
  constructor(private readonly learnIconService: LearnIconService) {}

  @Mutation('createLearnIcon')
  create(@Args('createLearnIconInput') createLearnIconInput: CreateLearnIconInput) {
    return this.learnIconService.create(createLearnIconInput);
  }

  @Query('learnIcon')
  findAll() {
    return this.learnIconService.findAll();
  }

  @Query('learnIcon')
  findOne(@Args('id') id: number) {
    return this.learnIconService.findOne(id);
  }

  @Mutation('updateLearnIcon')
  update(@Args('updateLearnIconInput') updateLearnIconInput: UpdateLearnIconInput) {
    return this.learnIconService.update(updateLearnIconInput.id, updateLearnIconInput);
  }

  @Mutation('removeLearnIcon')
  remove(@Args('id') id: number) {
    return this.learnIconService.remove(id);
  }
}
