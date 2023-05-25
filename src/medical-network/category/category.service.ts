import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getPagination } from '../helpers/pagination-util';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async listAllCategoriesByInsuranceCompanyId(
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
      'category',
      whereConditions,
      page,
      limit,
    );

    const result = await this.prisma.category.findMany({
      where: { ...whereConditions },
      ...pagination.query,
      include: {
        insuranceCompany: true,
      },
      orderBy: {
        tier: 'asc',
      },
    });

    return {
      category: result,
      pagination: pagination.response,
    };
  }

  async create(
    createCategoryInput: CreateCategoryInput,
    language: LanguageEnum,
  ) {
    console.log('createCategoryInput', createCategoryInput);
    return await this.prisma.category.create({
      data: {
        language,
        ...createCategoryInput,
      },
    });
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    console.log('updateCategoryInput', updateCategoryInput);
    return await this.prisma.category.update({
      where: {
        id: updateCategoryInput.id,
      },
      data: {
        ...updateCategoryInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
