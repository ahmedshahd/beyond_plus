import { Injectable } from '@nestjs/common';
import { getPagination } from '../helpers/pagination-util';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTpaInput } from './dto/tpa/create-tpa.input';
import { UpdateTpaInput } from './dto/tpa/update-tpa.input';
import { UpdateInsuranceCompanyInput } from './dto/insurance-company/update-insurance-company.input';
import { CreateInsuranceCompanyInput } from './dto/insurance-company/create-insurance-company.input';
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
  // insurance Company CRUD //
  async createInsuranceCompany(
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

  async updateInsuranceCompany(
    updateInsuranceCompanyInput: UpdateInsuranceCompanyInput,
  ) {
    return await this.prisma.insuranceCompany.update({
      where: {
        id: updateInsuranceCompanyInput.id,
      },
      data: {
        ...updateInsuranceCompanyInput,
      },
    });
  }

  async removeInsuranceCompany(id: number) {
    return await this.prisma.insuranceCompany.delete({
      where: {
        id,
      },
    });
  }

  // TPA  CRUD //

  // async createTpa(createTpaInput: CreateTpaInput, language: LanguageEnum) {
  //   console.log('createTpaInput', createTpaInput);
  //   return await this.prisma.insuranceCompany.create({
  //     data: {
  //       language,
  //       ...createTpaInput,
  //     },
  //   });
  // }

  // async updateTpa(updateTpaInput: UpdateTpaInput) {
  //   console.log('updateTpaInput', updateTpaInput);
  //   return await this.prisma.insuranceCompany.update({
  //     where: {
  //       id: updateTpaInput.id,
  //     },
  //     data: {
  //       ...updateTpaInput,
  //     },
  //   });
  // }

  // async removeTpa(id: number) {
  //   return await this.prisma.insuranceCompany.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
