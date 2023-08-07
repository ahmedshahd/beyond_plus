const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();



async function getOrCreateProviderType( insuranceCompanyId, language, name) {
    return prisma.providerType.upsert({
      where: {
        ProviderType_name_language_insuranceCompanyId_unique_constraint: {
          insuranceCompanyId: insuranceCompanyId,
          language: language,
          name: name,
        },
      },
      create: {
        insuranceCompanyId: insuranceCompanyId,
        language: language,
        name: name,
      },
      update: {},
    });
  }
  module.exports = getOrCreateProviderType