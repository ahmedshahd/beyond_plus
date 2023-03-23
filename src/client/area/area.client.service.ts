import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { getPagination } from 'src/medical-network/helpers/pagination-util';
import { PrismaService } from 'src/prisma.service';
import { CreateClientAreaInput } from './dto/create-area.client.input';
import { UpdateClientAreaInput } from './dto/update-area.client.input';

@Injectable()
export class AreaClientService {
  constructor(private prisma: PrismaService) {}

  async listAllClientAreasByClientCityId(
    clientCityId: number[],
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      clientCityId: { in: clientCityId },
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const pagination = await getPagination(
      'clientArea',
      whereConditions,
      page,
      limit,
    );
    const result = await this.prisma.clientArea.findMany({
      where: { ...whereConditions },
      include: {
        ClientCity: true,
      },
      ...pagination.query,
    });

    return {
      clientArea: result,
      pagination: pagination.response,
    };
  }

  async create(
    createClientAreaInput: CreateClientAreaInput,
    language: LanguageEnum,
  ) {
    console.log('createClientAreaInput', createClientAreaInput);
    return await this.prisma.clientArea.create({
      data: {
        language,
        ...createClientAreaInput,
      },
    });
  }

  async update(updateClientAreaInput: UpdateClientAreaInput) {
    console.log('updateClientAreaInput', updateClientAreaInput);
    return await this.prisma.clientArea.update({
      where: {
        id: updateClientAreaInput.id,
      },
      data: {
        ...updateClientAreaInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.clientArea.delete({
      where: {
        id,
      },
    });
  }
}
