import { Injectable } from '@nestjs/common';
import { getPagination } from '../helpers/pagination-util';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateInsuranceCompanyInput } from './dto/update-insurance-company.input';
import { CreateInsuranceCompanyInput } from './dto/create-insurance-company.input';
@Injectable()
export class InsuranceCompanyService {
  constructor(private prisma: PrismaService) {}

  async getInsuranceCompany(id: number) {
    return await this.prisma.insuranceCompany.findFirst({
      where: {
        id,
      },
    });
  }

  async listAllInsuranceCompaniesByTpaId(
    tpaId: number,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      tpaId: tpaId,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'insuranceCompany',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.insuranceCompany.findMany({
      where: {
        tpaId: tpaId,
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
      },
      orderBy: {
        name: 'asc',
      },
      ...pagination.query,
    });

    return {
      insuranceCompany: result,
      pagination: pagination.response,
    };
  }
  async create(
    createInsuranceCompanyInput: CreateInsuranceCompanyInput,
    language: LanguageEnum,
  ) {
    return await this.prisma.insuranceCompany.create({
      data: {
        language,
        ...createInsuranceCompanyInput,
      },
    });
  }

  async update(updateInsuranceCompanyInput: UpdateInsuranceCompanyInput) {
    return await this.prisma.insuranceCompany.update({
      where: {
        id: updateInsuranceCompanyInput.id,
      },
      data: {
        ...updateInsuranceCompanyInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.insuranceCompany.delete({
      where: {
        id,
      },
    });
  }
}
