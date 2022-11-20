import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService){}
  async create(createLabelInput: CreateLabelInput) {
    return await this.prisma.label.create({
      data:{
        ...createLabelInput
      }
    })
  }

  async findAll(language:LanguageEnum) {
    return await this.prisma.label.findMany({
      where:{
        language
      }
    })
  }

  async update(updateLabelInput: UpdateLabelInput) {
    return await this.prisma.label.update({
      where:{
        id: updateLabelInput.id
      },
      data:{
        ...updateLabelInput
      }
    })
  }

  async remove(id: number) {
    return  await this.prisma.label.delete({
      where:{
        id
      }
    })
  }
}
