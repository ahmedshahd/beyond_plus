import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LabelService } from './label.service';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Resolver('Label')
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  @Mutation('createLabel')
  create(@Args('createLabelInput') createLabelInput: CreateLabelInput) {
    return this.labelService.create(createLabelInput);
  }

  @Query('label')
  findAll() {
    return this.labelService.findAll();
  }

  @Query('label')
  findOne(@Args('id') id: number) {
    return this.labelService.findOne(id);
  }

  @Mutation('updateLabel')
  update(@Args('updateLabelInput') updateLabelInput: UpdateLabelInput) {
    return this.labelService.update(updateLabelInput.id, updateLabelInput);
  }

  @Mutation('removeLabel')
  remove(@Args('id') id: number) {
    return this.labelService.remove(id);
  }
}
