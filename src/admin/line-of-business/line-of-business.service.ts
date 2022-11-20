import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLineOfBusinessInput } from './dto/create-line-of-business.input';
import { UpdateLineOfBusinessInput } from './dto/update-line-of-business.input';
@Injectable()
export class LineOfBusinessService {
  constructor(private prisma: PrismaService) {}

  async create(createLineOfBusinessInput: CreateLineOfBusinessInput) {
    return await this.prisma.lineOfBusiness.create({
      data: {
        ...createLineOfBusinessInput,
      },
    });
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.lineOfBusiness.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateLineOfBusinessInput: UpdateLineOfBusinessInput) {
    return await this.prisma.lineOfBusiness.update({
      where: {
        id: updateLineOfBusinessInput.id,
      },
      data: {
        ...updateLineOfBusinessInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.lineOfBusiness.delete({
      where: {
        id,
      },
    });
  }
}
