import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { getPagination } from 'src/medical-network/helpers/pagination-util';
import { PrismaService } from 'src/prisma.service';
import { CreateClientCityInput } from './dto/create-city.client.input';
import { UpdateClientCityInput } from './dto/update-city.client.input';

@Injectable()
export class CityClientService {
  constructor(private prisma: PrismaService) {}

  async listAllClientCities(
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      language,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'clientCity',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.clientCity.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        clientArea: true,
      },
    });

    return {
      clientCity: result,
      pagination: pagination.response,
    };
  }
  async clientCity(id: number) {
    return await this.prisma.clientCity.findFirst({
      where: { id },
      include: {
        clientArea: true,
      },
    });
  }

  async create(
    createClientCityInput: CreateClientCityInput,
    language: LanguageEnum,
  ) {
    console.log('createCityInput', createClientCityInput);
    return await this.prisma.clientCity.create({
      data: {
        language,
        ...createClientCityInput,
      },
    });
  }

  async update(updateClientCityInput: UpdateClientCityInput) {
    console.log('updateClientCityInput', updateClientCityInput);
    return await this.prisma.clientCity.update({
      where: {
        id: updateClientCityInput.id,
      },
      data: {
        ...updateClientCityInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.clientCity.delete({
      where: {
        id,
      },
    });
  }
}
