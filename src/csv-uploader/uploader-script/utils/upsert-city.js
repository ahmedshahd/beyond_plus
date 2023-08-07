const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();



async function getOrCreateCity( countryId, insuranceCompanyId, language, name) {
    return prisma.city.upsert({
      where: {
        City_name_language_countryId_insuranceCompanyId_unique_constraint: {
          countryId: countryId,
          insuranceCompanyId: insuranceCompanyId,
          language: language,
          name: name,
        },
      },
      create: {
        countryId: countryId,
        insuranceCompanyId: insuranceCompanyId,
        language: language,
        name: name,
      },
      update: {},
    });
  }
  module.exports = getOrCreateCity