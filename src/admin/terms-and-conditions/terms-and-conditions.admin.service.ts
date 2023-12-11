import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTermsAndConditionsInput } from './dto/create-terms-and-conditions.input';
import { UpdateTermsAndConditionsInput } from './dto/update-terms-and-conditions.input';
@Injectable()
export class TermsAndConditionsAdminService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTermsAndConditionsInput: CreateTermsAndConditionsInput,
    language: LanguageEnum,
  ) {
    return await this.prisma.termsAndConditions.create({
      data: {
        language,
        ...createTermsAndConditionsInput,
      },
    });
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.termsAndConditions.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateTermsAndConditionsInput: UpdateTermsAndConditionsInput) {
    return await this.prisma.termsAndConditions.update({
      where: {
        id: updateTermsAndConditionsInput.id,
      },
      data: {
        ...updateTermsAndConditionsInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.termsAndConditions.delete({
      where: {
        id,
      },
    });
  }
}
