import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async listAllProvidersByProviderTypeIdAndAreaId(
    language: LanguageEnum,
    providerTypeId: number,
    areaId: number,
    categoryId: number,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      language: language,
      providerTypeId: providerTypeId,
      areaId: areaId,
      categoryId: categoryId,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'provider',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.provider.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        providerType: true,
        speciality: true,
        area: true,
      },
    });

    return {
      provider: result,
      pagination: pagination.response,
    };
  }
}
