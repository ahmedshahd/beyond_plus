import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

@Injectable()
export class ProviderTypeService {
  constructor(private prisma: PrismaService) {}

  async listAllProviderTypesByInsuranceCompanyId(
    language: LanguageEnum,
    insuranceCompanyId: number,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      language: language,
      insuranceCompanyId: insuranceCompanyId,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'providerType',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.providerType.findMany({
      where: { ...whereConditions },
      ...pagination.query,
    });

    return {
      providerType: result,
      pagination: pagination.response,
    };
  }
}
