import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

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
}
