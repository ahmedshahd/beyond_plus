import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { CreateTermsAndConditionInput } from './dto/create-terms-and-condition.input';
import { UpdateTermsAndConditionInput } from './dto/update-terms-and-condition.input';

@Resolver('TermsAndCondition')
export class TermsAndConditionsResolver {
  constructor(private readonly termsAndConditionsService: TermsAndConditionsService) {}

  @Mutation('createTermsAndCondition')
  create(@Args('createTermsAndConditionInput') createTermsAndConditionInput: CreateTermsAndConditionInput) {
    return this.termsAndConditionsService.create(createTermsAndConditionInput);
  }

  @Query('termsAndConditions')
  findAll() {
    return this.termsAndConditionsService.findAll();
  }

  @Query('termsAndCondition')
  findOne(@Args('id') id: number) {
    return this.termsAndConditionsService.findOne(id);
  }

  @Mutation('updateTermsAndCondition')
  update(@Args('updateTermsAndConditionInput') updateTermsAndConditionInput: UpdateTermsAndConditionInput) {
    return this.termsAndConditionsService.update(updateTermsAndConditionInput.id, updateTermsAndConditionInput);
  }

  @Mutation('removeTermsAndCondition')
  remove(@Args('id') id: number) {
    return this.termsAndConditionsService.remove(id);
  }
}
