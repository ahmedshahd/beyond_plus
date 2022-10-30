import { Injectable } from '@nestjs/common';
import { CreateTermsAndConditionInput } from './dto/create-terms-and-condition.input';
import { UpdateTermsAndConditionInput } from './dto/update-terms-and-condition.input';

@Injectable()
export class TermsAndConditionsService {
  create(createTermsAndConditionInput: CreateTermsAndConditionInput) {
    return 'This action adds a new termsAndCondition';
  }

  findAll() {
    return `This action returns all termsAndConditions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termsAndCondition`;
  }

  update(id: number, updateTermsAndConditionInput: UpdateTermsAndConditionInput) {
    return `This action updates a #${id} termsAndCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} termsAndCondition`;
  }
}
