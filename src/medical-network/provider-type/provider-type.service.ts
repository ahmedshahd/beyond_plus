import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateProviderTypeInput } from './dto/create-provider-type.input';
import { UpdateProviderTypeInput } from './dto/update-provider-type.input';

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
      include: {
        insuranceCompany: true,
      },
    });

    return {
      providerType: result,
      pagination: pagination.response,
    };
  }



  async create(createProviderTypeInput: CreateProviderTypeInput, language: LanguageEnum) {
    console.log('createProviderTypeInput', createProviderTypeInput);
    return await this.prisma.providerType.create({
      data: {
        language,
        ...createProviderTypeInput,
      },
    });
  }

  async update(updateProviderTypeInput: UpdateProviderTypeInput) {
    console.log('updateProviderTypeInput', updateProviderTypeInput);
    return await this.prisma.providerType.update({
      where: {
        id: updateProviderTypeInput.id,
      },
      data: {
        ...updateProviderTypeInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.providerType.delete({
      where: {
        id,
      },
    });
  }
}
