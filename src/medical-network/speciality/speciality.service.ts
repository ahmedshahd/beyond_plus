import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateSpecialityInput } from './dto/create-speciality.input';
import { UpdateSpecialityInput } from './dto/update-speciality.input';

@Injectable()
export class SpecialityService {
  constructor(private prisma: PrismaService) {}

  async listAllSpecialityByProviderTypeId(
    providerTypeId: number[],
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      providerTypeId: { in: providerTypeId },
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      language,
    };

    const pagination = await getPagination(
      'speciality',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.speciality.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        subSpeciality: true,
        provider: true,
      },
    });

    return {
      speciality: result,
      pagination: pagination.response,
    };
  }
  async create(
    createSpecialityInput: CreateSpecialityInput,
    language: LanguageEnum,
  ) {
    console.log('createSpecialityInput', createSpecialityInput);
    return await this.prisma.speciality.create({
      data: {
        language,
        ...createSpecialityInput,
      },
    });
  }

  async update(updateSpecialityInput: UpdateSpecialityInput) {
    console.log('updateSpecialityInput', updateSpecialityInput);
    return await this.prisma.speciality.update({
      where: {
        id: updateSpecialityInput.id,
      },
      data: {
        ...updateSpecialityInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.speciality.delete({
      where: {
        id,
      },
    });
  }
}
