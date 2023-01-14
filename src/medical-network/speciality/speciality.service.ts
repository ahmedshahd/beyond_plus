import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';

@Injectable()
export class SpecialityService {
  constructor(private prisma: PrismaService) {}

  async listAllSpecialityByProviderId(
    providerId: number[],
    language: LanguageEnum,
    search: string,
    page: number,
    limit: number,
  ) {
    const whereConditions: any = {
      providerId: { in: providerId },
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
}
