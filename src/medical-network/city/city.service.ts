import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update.city.input';

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
      orderBy: {
        name: 'asc',
      },
    });

    return {
      city: result,
      pagination: pagination.response,
    };
  }

  async create(createCityInput: CreateCityInput, language: LanguageEnum) {
    console.log('createCityInput', createCityInput);
    return await this.prisma.city.create({
      data: {
        language,
        ...createCityInput,
      },
    });
  }

  async update(updateCityInput: UpdateCityInput) {
    console.log('updateCityInput', updateCityInput);
    return await this.prisma.city.update({
      where: {
        id: updateCityInput.id,
      },
      data: {
        ...updateCityInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.city.delete({
      where: {
        id,
      },
    });
  }
}
