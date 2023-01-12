import { Injectable } from '@nestjs/common';
import { getPagination } from '../helpers/pagination-util';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class InsuranceCompanyService {
  constructor(private prisma: PrismaService) {}

  async listAllTpas(
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      parentId: null,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      language,
    };

    const pagination = await getPagination(
      'insuranceCompany',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.insuranceCompany.findMany({
      where: { ...whereConditions },
      ...pagination.query,
    });

    return {
      tpa: result,
      pagination: pagination.response,
    };
  }

  async listAllInsuranceCompaniesByTpaId(
    tpaId: number,
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      parentId: tpaId,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      language,
    };

    const pagination = await getPagination(
      'insuranceCompany',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.insuranceCompany.findMany({
      where: {
        parentId: tpaId,
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
      },
      ...pagination.query,
    });

    return {
      insuranceCompany: result,
      pagination: pagination.response,
    };
  }
}
