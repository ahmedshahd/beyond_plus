import { LanguageEnum } from '.prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LabelAdminService } from './label.admin.service';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Resolver('Admin/Label')
export class LabelAdminResolver {
  constructor(private readonly labelAdminService: LabelAdminService) {}

  @Mutation('createLabel')
  create(@Args('createLabelInput') createLabelInput: CreateLabelInput) {
    return this.labelAdminService.create(createLabelInput);
  }

  @Query('label')
  findAll(language: LanguageEnum) {
    return this.labelAdminService.findAll(language);
  }

  @Mutation('updateLabel')
  update(@Args('updateLabelInput') updateLabelInput: UpdateLabelInput) {
    return this.labelAdminService.update(updateLabelInput);
  }

  @Mutation('removeLabel')
  remove(@Args('id') id: number) {
    return this.labelAdminService.remove(id);
  }
}
