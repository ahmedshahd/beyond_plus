import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateTermsAndConditionsInput } from './dto/create-terms-and-conditions.input';
import { UpdateTermsAndConditionsInput } from './dto/update-terms-and-conditions.input';
import { TermsAndConditionsAdminService } from './terms-and-conditions.admin.service';

@Resolver('Admin/TermsAndConditions')
export class TermsAndConditionsAdminResolver {
  constructor(
    private readonly termsAndConditionsAdminService: TermsAndConditionsAdminService,
  ) {}

  @Mutation('createTermsAndConditions')
  create(
    @Args('createTermsAndConditionsInput')
    createTermsAndConditionInput: CreateTermsAndConditionsInput,
  ) {
    return this.termsAndConditionsAdminService.create(
      createTermsAndConditionInput,
    );
  }

  @Query('termsAndConditions')
  findAll(language: LanguageEnum) {
    return this.termsAndConditionsAdminService.findAll(language);
  }

  @Mutation('updateTermsAndConditions')
  update(
    @Args('updateTermsAndConditionsInput')
    updateTermsAndConditionsInput: UpdateTermsAndConditionsInput,
  ) {
    return this.termsAndConditionsAdminService.update(
      updateTermsAndConditionsInput,
    );
  }

  @Mutation('removeTermsAndConditions')
  remove(@Args('id') id: number) {
    return this.termsAndConditionsAdminService.remove(id);
  }
}
