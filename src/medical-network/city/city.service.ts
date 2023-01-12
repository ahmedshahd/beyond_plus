import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async listAllCitiesByInsuranceCompanyId(
    language: LanguageEnum,
    insuranceCompanyId: number,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      language,
      insuranceCompanyId,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'city',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.city.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        insuranceCompany: true,
        country: true,
        area: true,
      },
    });

    return {
      city: result,
      pagination: pagination.response,
    };
  }
}
