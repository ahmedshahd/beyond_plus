import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async listAllCateoriesByInsuranceCompanyId(
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
      'category',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.category.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        insuranceCompany: true,
      },
    });

    return {
      providerType: result,
      pagination: pagination.response,
    };
  }
}
