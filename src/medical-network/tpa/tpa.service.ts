import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateTpaInput } from './dto/create-tpa.input';
import { UpdateTpaInput } from './dto/update-tpa.input';

@Injectable()
export class TpaService {
  constructor(private prisma: PrismaService) {}

  async getTpaId(name: string) {
    // console.log('name', name);
    return await this.prisma.tpa.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      language,
    };

    const pagination = await getPagination('tpa', whereConditions, page, limit);

    const result = await this.prisma.tpa.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        insuranceCompanies: true,
      },
    });

    return {
      tpa: result,
      pagination: pagination.response,
    };
  }

  async create(createTpaInput: CreateTpaInput, language: LanguageEnum) {
    console.log('createTpaInput', createTpaInput);
    return await this.prisma.tpa.create({
      data: {
        language,
        ...createTpaInput,
      },
    });
  }

  async update(updateTpaInput: UpdateTpaInput) {
    console.log('updateTpaInput', updateTpaInput);
    return await this.prisma.tpa.update({
      where: {
        id: updateTpaInput.id,
      },
      data: {
        ...updateTpaInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.tpa.delete({
      where: {
        id,
      },
    });
  }
}
