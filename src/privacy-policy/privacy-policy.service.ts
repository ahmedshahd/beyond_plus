import { Injectable } from '@nestjs/common';
import { CreatePrivacyPolicyInput } from './dto/create-privacy-policy.input';
import { UpdatePrivacyPolicyInput } from './dto/update-privacy-policy.input';

@Injectable()
export class PrivacyPolicyService {
  create(createPrivacyPolicyInput: CreatePrivacyPolicyInput) {
    return 'This action adds a new privacyPolicy';
  }

  findAll() {
    return `This action returns all privacyPolicy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privacyPolicy`;
  }

  update(id: number, updatePrivacyPolicyInput: UpdatePrivacyPolicyInput) {
    return `This action updates a #${id} privacyPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} privacyPolicy`;
  }
}
