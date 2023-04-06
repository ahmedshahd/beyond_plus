import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async listAllProvidersBySpecialityIdAndSubSpecialityIdAndAreaIdAndCategoryId(
    specialityId: number[],
    // subSpecialityId: number[],
    areaId: number[],
    categoryId: number[],
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
    };

    if (specialityId) {
      whereConditions.specialityId = { in: specialityId };
    }

    if (areaId) {
      whereConditions.areaId = { in: areaId };
    }

    if (categoryId) {
      whereConditions.categoryId = { in: categoryId };
    }
    console.log('whereConditions', whereConditions);

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
        area: true,
        speciality: true,
        // subSpeciality: true,
        category: true,
      },
    });

    return {
      provider: result,
      pagination: pagination.response,
    };
  }

  // async listAllProvidersByInsuranceCompanyId(
  //   insuranceCompanyId: number,
  //   search: string,
  //   page: number,
  //   limit: number,
  // ) {
  //   const whereConditions: any = {
  //     insuranceCompanyId: insuranceCompanyId,
  //     name: search
  //       ? {
  //           contains: search,
  //           mode: 'insensitive',
  //         }
  //       : undefined,
  //   };

  //   const pagination = await getPagination(
  //     'provider',
  //     whereConditions,
  //     page,
  //     limit,
  //   );

  //   const result = await this.prisma.provider.findMany({
  //     where: { ...whereConditions },
  //     ...pagination.query,
  //   });

  //   return {
  //     provider: result,
  //     pagination: pagination.response,
  //   };
  // }

  async create(
    createProviderInput: CreateProviderInput,
    language: LanguageEnum,
  ) {
    console.log('createProviderInput', createProviderInput);
    return await this.prisma.provider.create({
      data: {
        language,
        ...createProviderInput,
      },
    });
  }

  async update(updateProviderInput: UpdateProviderInput) {
    console.log('updateProviderInput', updateProviderInput);
    return await this.prisma.provider.update({
      where: {
        id: updateProviderInput.id,
      },
      data: {
        ...updateProviderInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.provider.delete({
      where: {
        id,
      },
    });
  }
}
