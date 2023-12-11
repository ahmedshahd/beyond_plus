import { LanguageEnum } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrivacyPolicyAdminService } from './privacy-policy.admin.service';
import { CreatePrivacyPolicyInput } from './dto/create-privacy-policy.input';
import { UpdatePrivacyPolicyInput } from './dto/update-privacy-policy.input';

@Resolver('Admin/PrivacyPolicy')
export class PrivacyPolicyAdminResolver {
  constructor(
    private readonly privacyPolicyAdminService: PrivacyPolicyAdminService,
  ) {}

  @Mutation('createPrivacyPolicy')
  create(
    @Args('createPrivacyPolicyInput')
    createPrivacyPolicyInput: CreatePrivacyPolicyInput,
    @Args('language')
    language: LanguageEnum,
  ) {
    return this.privacyPolicyAdminService.create(
      createPrivacyPolicyInput,
      language,
    );
  }

  @Query('privacyPolicy')
  findAll(@Args('language') language: LanguageEnum) {
    return this.privacyPolicyAdminService.findAll(language);
  }

  @Mutation('updatePrivacyPolicy')
  update(
    @Args('updatePrivacyPolicyInput')
    updatePrivacyPolicyInput: UpdatePrivacyPolicyInput,
  ) {
    return this.privacyPolicyAdminService.update(updatePrivacyPolicyInput);
  }

  @Mutation('removePrivacyPolicy')
  remove(@Args('id') id: number) {
    return this.privacyPolicyAdminService.remove(id);
  }
}
