import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateLearnIconInput } from './dto/create-learn-icon.input';
import { UpdateLearnIconInput } from './dto/update-learn-icon.input';

@Injectable()
export class LearnIconAdminService {
  constructor(private prisma: PrismaService) {}

  async create(
    createLearnIconInput: CreateLearnIconInput,
    language: LanguageEnum,
  ) {
    return await this.prisma.learnIcon.create({
      data: {
        language,
        ...createLearnIconInput,
      },
    });
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.learnIcon.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateLearnIconInput: UpdateLearnIconInput) {
    return await this.prisma.learnIcon.update({
      where: {
        id: updateLearnIconInput.id,
      },
      data: {
        ...updateLearnIconInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.learnIcon.delete({
      where: {
        id,
      },
    });
  }
}
