import { Injectable } from '@nestjs/common';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Injectable()
export class LabelService {
  create(createLabelInput: CreateLabelInput) {
    return 'This action adds a new label';
  }

  findAll() {
    return `This action returns all label`;
  }

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  update(id: number, updateLabelInput: UpdateLabelInput) {
    return `This action updates a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
