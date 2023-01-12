import { PrismaService } from 'src/prisma.service';

const prisma = new PrismaService();

export const getPagination = async (
  modelName: string,
  whereConditions: object = {},
  page = 1,
  limit = 25,
) => {
  const totalItemsCount = await prisma[modelName].count({
    where: whereConditions,
  });

  const take =
    limit && page && !isNaN(limit) && !isNaN(page) ? limit : undefined;

  const pagesCount =
    limit && page && !isNaN(limit) && !isNaN(page)
      ? Math.ceil(totalItemsCount / take)
      : undefined;

  const skip =
    limit && page && !isNaN(limit) && !isNaN(page)
      ? (page - 1) * limit
      : undefined;

  return {
    query: {
      skip,
      take,
    },
    response: {
      totalItemsCount,
      pagesCount,
      page,
    },
  };
};
