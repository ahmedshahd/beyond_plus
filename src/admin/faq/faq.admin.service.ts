import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';

@Injectable()
export class FaqAdminService {
  constructor(private prisma: PrismaService) {}
  async create(createFaqInput: CreateFaqInput) {
    return await this.prisma.fAQ.create({
      data: {
        ...createFaqInput,
      },
    });
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.fAQ.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateFaqInput: UpdateFaqInput) {
    return await this.prisma.fAQ.update({
      where: {
        id: updateFaqInput.id,
      },
      data: {
        ...updateFaqInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.fAQ.delete({
      where: {
        id,
      },
    });
  }
}
