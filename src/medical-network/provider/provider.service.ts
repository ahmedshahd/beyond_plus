import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async listAllProviders(
    specialityId: number[],
    subSpecialityId: number[],
    areaId: number[],
    insuranceCompanyId: number,
    tierRank: number,
    providerTypeId: number[],
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      insuranceCompanyId: insuranceCompanyId,
      tierRank: {
        lte: tierRank,
      },
      areaId: { in: areaId },
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };
    if (providerTypeId) {
      whereConditions.providerTypeId = { in: providerTypeId };
    }

    if (specialityId) {
      whereConditions.specialityId = { in: specialityId };
    }

    if (subSpecialityId) {
      whereConditions.subSpecialityId = { in: subSpecialityId };
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
        // providerType:true,
        subSpeciality: true,
        insuranceCompany: true,
      },
    });

    return {
      provider: result,
      pagination: pagination.response,
    };
  }

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
