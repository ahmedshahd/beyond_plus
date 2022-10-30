import { Injectable } from '@nestjs/common';
import { CreateLearnIconInput } from './dto/create-learn-icon.input';
import { UpdateLearnIconInput } from './dto/update-learn-icon.input';

@Injectable()
export class LearnIconService {
  create(createLearnIconInput: CreateLearnIconInput) {
    return 'This action adds a new learnIcon';
  }

  findAll() {
    return `This action returns all learnIcon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnIcon`;
  }

  update(id: number, updateLearnIconInput: UpdateLearnIconInput) {
    return `This action updates a #${id} learnIcon`;
  }

  remove(id: number) {
    return `This action removes a #${id} learnIcon`;
  }
}
