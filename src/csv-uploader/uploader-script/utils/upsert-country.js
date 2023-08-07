const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();


export async function getOrCreateCountry( language) {
    return prisma.country.upsert({
      where: {
        Country_name_language_unique_constraint: {
          name: language == 'ENGLISH' ? 'Egypt' : 'مصر',
          language: language,
        },
      },
      create: {
        name: language == 'ENGLISH' ? 'Egypt' : 'مصر',
        language: language,
      },
      update: {},
    });
  }
  module.exports = getOrCreateCountry