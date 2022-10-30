import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
  findAll() {
    return this.termsAndConditionsService.findAll();
  }

  @Query('termsAndConditions')
  findOne(@Args('id') id: number) {
    return this.termsAndConditionsService.findOne(id);
  }

  @Mutation('updateTermsAndConditions')
  update(@Args('updateTermsAndConditionsInput') updateTermsAndConditionsInput: UpdateTermsAndConditionsInput) {
    return this.termsAndConditionsService.update(updateTermsAndConditionsInput.id, updateTermsAndConditionsInput);
  }

  @Mutation('removeTermsAndConditions')
  remove(@Args('id') id: number) {
    return this.termsAndConditionsService.remove(id);
  }
}
