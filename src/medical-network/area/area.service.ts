import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';
@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async listAllAreasByCityId(
    cityId: number[],
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      cityId: { in: cityId },
      language: language,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'area',
      whereConditions,
      page,
      limit,
    );
    const result = await this.prisma.area.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        city: true,
        provider: true,
      },
    });

    return {
      area: result,
      pagination: pagination.response,
    };
  }

  async create(createAreaInput: CreateAreaInput, language: LanguageEnum) {
    console.log('createAreaInput', createAreaInput);
    return await this.prisma.area.create({
      data: {
        language,
        ...createAreaInput,
      },
    });
  }

  async update(updateAreaInput: UpdateAreaInput) {
    console.log('updateAreaInput', updateAreaInput);
    return await this.prisma.area.update({
      where: {
        id: updateAreaInput.id,
      },
      data: {
        ...updateAreaInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.area.delete({
      where: {
        id,
      },
    });
  }
}
