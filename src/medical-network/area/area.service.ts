import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async listAllAreasByCityId(
    cityId: number,
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      cityId,
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
}
