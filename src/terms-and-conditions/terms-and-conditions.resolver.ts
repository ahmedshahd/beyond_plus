import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateTermsAndConditionsInput } from './dto/create-terms-and-conditions.input';
import { UpdateTermsAndConditionsInput } from './dto/update-terms-and-conditions.input';
import { TermsAndConditionsService } from './terms-and-conditions.service';

@Resolver('TermsAndConditions')
export class TermsAndConditionsResolver {
  constructor(private readonly termsAndConditionsService: TermsAndConditionsService) {}

  @Mutation('createTermsAndConditions')
  create(@Args('createTermsAndConditionsInput') createTermsAndConditionInput: CreateTermsAndConditionsInput) {
    return this.termsAndConditionsService.create(createTermsAndConditionInput);
  }

  @Query('termsAndConditions')
  findAll(language:LanguageEnum) {
    return this.termsAndConditionsService.findAll(language);
  }

  @Mutation('updateTermsAndConditions')
  update(@Args('updateTermsAndConditionsInput') updateTermsAndConditionsInput: UpdateTermsAndConditionsInput) {
    return this.termsAndConditionsService.update(updateTermsAndConditionsInput);
  }

  @Mutation('removeTermsAndConditions')
  remove(@Args('id') id: number) {
    return this.termsAndConditionsService.remove(id);
  }
}
