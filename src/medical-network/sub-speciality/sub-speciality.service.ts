import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateSubSpecialityInput } from './dto/create-speciality.input';
import { UpdateSubSpecialityInput } from './dto/update-speciality.input';

@Injectable()
export class SubSpecialityService {
  constructor(private prisma: PrismaService) {}

  async listAllSubSpecialityBySpecialityId(
    specialityId: number[],
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      specialityId: { in: specialityId },
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      language,
    };
    const pagination = await getPagination(
      'subSpeciality',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.subSpeciality.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        speciality: true,
      },
    });
    return {
      subSpeciality: result,
      pagination: pagination.response,
    };
  }
  async create(
    createSubSpecialityInput: CreateSubSpecialityInput,
    language: LanguageEnum,
  ) {
    console.log('createSubSpecialityInput', createSubSpecialityInput);
    return await this.prisma.subSpeciality.create({
      data: {
        language,
        ...createSubSpecialityInput,
      },
    });
  }

  async update(updateSubSpecialityInput: UpdateSubSpecialityInput) {
    console.log('updateSubSpecialityInput', updateSubSpecialityInput);
    return await this.prisma.subSpeciality.update({
      where: {
        id: updateSubSpecialityInput.id,
      },
      data: {
        ...updateSubSpecialityInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.subSpeciality.delete({
      where: {
        id,
      },
    });
  }
}
