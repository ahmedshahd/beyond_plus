import { Injectable } from '@nestjs/common';
import { CreateTermsAndConditionsInput } from './dto/create-terms-and-conditions.input';
import { UpdateTermsAndConditionsInput } from './dto/update-terms-and-conditions.input';
@Injectable()
export class TermsAndConditionsService {
  create(createTermsAndConditionsInput: CreateTermsAndConditionsInput) {
    return 'This action adds a new termsAndCondition';
  }

  findAll() {
    return `This action returns all termsAndConditions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termsAndCondition`;
  }

  update(id: number, updateTermsAndConditionsInput: UpdateTermsAndConditionsInput) {
    return `This action updates a #${id} termsAndCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} termsAndCondition`;
  }
}
