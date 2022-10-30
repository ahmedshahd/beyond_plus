import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrivacyPolicyService } from './privacy-policy.service';
import { CreatePrivacyPolicyInput } from './dto/create-privacy-policy.input';
import { UpdatePrivacyPolicyInput } from './dto/update-privacy-policy.input';

@Resolver('PrivacyPolicy')
export class PrivacyPolicyResolver {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Mutation('createPrivacyPolicy')
  create(@Args('createPrivacyPolicyInput') createPrivacyPolicyInput: CreatePrivacyPolicyInput) {
    return this.privacyPolicyService.create(createPrivacyPolicyInput);
  }

  @Query('privacyPolicy')
  findAll() {
    return this.privacyPolicyService.findAll();
  }

  @Query('privacyPolicy')
  findOne(@Args('id') id: number) {
    return this.privacyPolicyService.findOne(id);
  }

  @Mutation('updatePrivacyPolicy')
  update(@Args('updatePrivacyPolicyInput') updatePrivacyPolicyInput: UpdatePrivacyPolicyInput) {
    return this.privacyPolicyService.update(updatePrivacyPolicyInput.id, updatePrivacyPolicyInput);
  }

  @Mutation('removePrivacyPolicy')
  remove(@Args('id') id: number) {
    return this.privacyPolicyService.remove(id);
  }
}
